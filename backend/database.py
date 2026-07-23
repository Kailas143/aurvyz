from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from typing import Any, Optional
from urllib.parse import urlparse

from pymongo import AsyncMongoClient


DEFAULT_DB_URL = "mongodb://127.0.0.1:27017/aurvyz"


class Database:
    def __init__(self, database_url: Optional[str] = None) -> None:
        self.database_url = (
            database_url
            or os.environ.get("MONGODB_URL")
            or os.environ.get("DATABASE_URL")
            or DEFAULT_DB_URL
        )
        self.client: Optional[AsyncMongoClient] = None
        self.db = None
        self.categories = None
        self.articles = None
        self.prototypes = None
        self.scheduled_articles = None
        self.leads = None
        self.audit_chats = None

    async def connect(self) -> None:
        if self.client:
            return
        self.client = AsyncMongoClient(self.database_url)
        self.db = self.client.get_default_database()
        if self.db is None:
            database_name = (
                os.environ.get("MONGODB_DB")
                or self._parse_db_name_from_url(self.database_url)
                or "aurvyz"
            )
            self.db = self.client[database_name]

        self.categories = self.db["categories"]
        self.articles = self.db["articles"]
        self.prototypes = self.db["prototypes"]
        self.scheduled_articles = self.db["scheduled_articles"]
        self.leads = self.db["leads"]
        self.audit_chats = self.db["audit_chats"]

    async def close(self) -> None:
        if self.client:
            self.client.close()
            self.client = None
            self.db = None

    async def init_schema(self) -> None:
        assert self.db is not None
        await self.categories.create_index("name", unique=True)
        await self.articles.create_index("id", unique=True)
        await self.articles.create_index("slug", unique=True)
        await self.articles.create_index([("publishedAt", -1), ("title", 1)])
        await self.prototypes.create_index("id", unique=True)
        await self.prototypes.create_index("title", unique=False)
        await self.scheduled_articles.create_index("id", unique=True)
        await self.scheduled_articles.create_index([("publishDate", -1), ("title", 1)])
        await self.leads.create_index("id", unique=True)
        await self.leads.create_index("email")
        await self.leads.create_index([("email", 1), ("lead_type", 1)])
        await self.leads.create_index([("created_at", -1)])
        await self.audit_chats.create_index("session_id", unique=True)

    async def fetch_analytics(self) -> dict[str, Any]:
        assert self.db is not None
        articles_count = await self.articles.count_documents({})
        categories_count = await self.categories.count_documents({})
        prototypes_count = await self.prototypes.count_documents({})
        scheduled_count = await self.scheduled_articles.count_documents({})
        rows = self.articles.aggregate([
            {
                "$group": {
                    "_id": {"$ifNull": ["$category", "Uncategorized"]},
                    "count": {"$sum": 1},
                }
            },
            {"$sort": {"count": -1, "_id": 1}},
        ])
        top_categories = [
            {"name": row["_id"], "count": row["count"]}
            async for row in rows
        ]
        return {
            "articlesCount": articles_count,
            "categoriesCount": categories_count,
            "prototypesCount": prototypes_count,
            "scheduledCount": scheduled_count,
            "topCategories": top_categories,
        }

    async def fetch_articles(self) -> list[dict[str, Any]]:
        assert self.articles is not None
        cursor = self.articles.find({}, projection={"_id": False}).sort(
            [("publishedAt", -1), ("title", 1)]
        ).limit(100)
        return [self._article_row_to_dict(row) async for row in cursor]

    async def fetch_article_by_slug(self, slug: str) -> Optional[dict[str, Any]]:
        assert self.articles is not None
        row = await self.articles.find_one({"slug": slug}, {"_id": False})
        return self._article_row_to_dict(row) if row else None

    async def fetch_article_titles(self) -> list[str]:
        assert self.articles is not None
        cursor = self.articles.find({}, {"title": True, "_id": False}).sort("title", 1)
        return [row["title"] async for row in cursor]

    async def create_article(self, article_doc: dict[str, Any]) -> dict[str, Any]:
        assert self.articles is not None
        article_doc = article_doc.copy()
        article_doc["publishedAt"] = self._as_datetime(article_doc["publishedAt"])
        await self.articles.insert_one(article_doc)
        return article_doc

    async def delete_article(self, article_id: str) -> bool:
        assert self.articles is not None
        result = await self.articles.delete_one({"id": article_id})
        return result.deleted_count == 1

    async def fetch_categories(self) -> list[str]:
        assert self.categories is not None
        cursor = self.categories.find({}, {"name": True, "_id": False}).sort("name", 1)
        return [row["name"] async for row in cursor]

    async def fetch_prototypes(self) -> list[dict[str, Any]]:
        assert self.prototypes is not None
        cursor = self.prototypes.find({}, projection={"_id": False}).sort("title", 1).limit(100)
        return [self._prototype_row_to_dict(row) async for row in cursor]

    async def fetch_scheduled_articles(self) -> list[dict[str, Any]]:
        assert self.scheduled_articles is not None
        cursor = self.scheduled_articles.find({}, projection={"_id": False}).sort(
            [("publishDate", -1), ("title", 1)]
        ).limit(100)
        return [self._scheduled_row_to_dict(row) async for row in cursor]

    async def insert_lead(self, lead_doc: dict[str, Any]) -> None:
        assert self.leads is not None
        doc = lead_doc.copy()
        doc["email"] = doc["email"].lower()
        doc["created_at"] = self._as_datetime(doc["created_at"])
        doc["scheduled_at"] = self._as_datetime(doc.get("scheduled_at"))
        doc["calendly_bookings"] = doc.get("calendly_bookings", []) or []
        await self.leads.insert_one(doc)

    async def update_lead(self, lead_id: str, fields: dict[str, Any]) -> None:
        assert self.leads is not None
        if not fields:
            return
        update_fields: dict[str, Any] = {}
        for key, value in fields.items():
            if key in {"created_at", "scheduled_at"}:
                update_fields[key] = self._as_datetime(value)
            else:
                update_fields[key] = value
        await self.leads.update_one({"id": lead_id}, {"$set": update_fields})

    async def find_lead_by_email(
        self,
        email: str,
        *,
        lead_type: Optional[str] = None,
        source: Optional[str] = None,
    ) -> Optional[dict[str, Any]]:
        assert self.leads is not None
        query: dict[str, Any] = {"email": email.lower()}
        if lead_type is not None:
            query["lead_type"] = lead_type
        if source is not None:
            query["source"] = source
        row = await self.leads.find_one(query, {"_id": False}, sort=[("created_at", -1)])
        return self._lead_row_to_dict(row) if row else None

    async def list_leads(self, limit: int) -> list[dict[str, Any]]:
        assert self.leads is not None
        cursor = self.leads.find({}, projection={"_id": False}).sort("created_at", -1).limit(limit)
        return [self._lead_row_to_dict(row) async for row in cursor]

    async def upsert_audit_chat(
        self,
        *,
        session_id: str,
        history: list[dict[str, Any]],
        captured_email: Optional[str],
        latest_intent: Optional[str],
        updated_at: str | datetime,
    ) -> None:
        assert self.audit_chats is not None
        await self.audit_chats.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "history": history,
                    "captured_email": captured_email,
                    "latest_intent": latest_intent,
                    "updated_at": self._as_datetime(updated_at),
                }
            },
            upsert=True,
        )

    async def get_audit_chat(self, session_id: str) -> Optional[dict[str, Any]]:
        assert self.audit_chats is not None
        row = await self.audit_chats.find_one({"session_id": session_id}, {"_id": False})
        return self._audit_chat_row_to_dict(row) if row else None

    async def update_audit_chat_report_state(
        self,
        *,
        session_id: str,
        captured_email: str,
        report_emailed: bool,
    ) -> None:
        assert self.audit_chats is not None
        await self.audit_chats.update_one(
            {"session_id": session_id},
            {"$set": {"captured_email": captured_email, "report_emailed": report_emailed}},
        )

    async def reset_seed_tables(self) -> None:
        assert self.db is not None
        await self.articles.delete_many({})
        await self.categories.delete_many({})
        await self.prototypes.delete_many({})
        await self.scheduled_articles.delete_many({})

    async def insert_category(self, name: str) -> None:
        assert self.categories is not None
        await self.categories.update_one(
            {"name": name},
            {"$setOnInsert": {"name": name}},
            upsert=True,
        )

    async def insert_prototype(self, prototype: dict[str, Any]) -> None:
        assert self.prototypes is not None
        await self.prototypes.update_one(
            {"id": prototype["id"]},
            {
                "$set": {
                    "title": prototype["title"],
                    "industry": prototype["industry"],
                    "buildTime": prototype["buildTime"],
                    "techStack": prototype["techStack"],
                    "summary": prototype["summary"],
                    "thumbnailUrl": prototype["thumbnailUrl"],
                    "demoUrl": prototype["demoUrl"],
                    "walkthroughUrl": prototype["walkthroughUrl"],
                }
            },
            upsert=True,
        )

    async def insert_scheduled_article(self, article: dict[str, Any]) -> None:
        assert self.scheduled_articles is not None
        await self.scheduled_articles.update_one(
            {"id": article["id"]},
            {
                "$set": {
                    "title": article["title"],
                    "status": article["status"],
                    "publishDate": self._as_datetime(article.get("publishDate")),
                    "author": article["author"],
                    "category": article["category"],
                }
            },
            upsert=True,
        )

    def _article_row_to_dict(self, row: dict[str, Any]) -> dict[str, Any]:
        if row is None:
            return {}
        return {
            "id": row["id"],
            "slug": row["slug"],
            "title": row["title"],
            "excerpt": row["excerpt"],
            "content": row["content"],
            "category": row["category"],
            "author": row["author"],
            "publishedAt": self._to_iso(row["publishedAt"]),
            "readingTime": row["readingTime"],
            "imageUrl": row["imageUrl"],
            "tags": row.get("tags", []),
            "featured": row["featured"],
        }

    def _prototype_row_to_dict(self, row: dict[str, Any]) -> dict[str, Any]:
        return {
            "id": row["id"],
            "title": row["title"],
            "industry": row["industry"],
            "buildTime": row["buildTime"],
            "techStack": row.get("techStack", []),
            "summary": row["summary"],
            "thumbnailUrl": row["thumbnailUrl"],
            "demoUrl": row["demoUrl"],
            "walkthroughUrl": row["walkthroughUrl"],
        }

    def _scheduled_row_to_dict(self, row: dict[str, Any]) -> dict[str, Any]:
        return {
            "id": row["id"],
            "title": row["title"],
            "status": row["status"],
            "publishDate": self._to_iso(row["publishDate"]) if row.get("publishDate") else None,
            "author": row["author"],
            "category": row["category"],
        }

    def _lead_row_to_dict(self, row: dict[str, Any]) -> dict[str, Any]:
        return {
            "id": row["id"],
            "name": row.get("name"),
            "email": row.get("email"),
            "company": row.get("company"),
            "message": row.get("message"),
            "lead_type": row.get("lead_type"),
            "source": row.get("source"),
            "created_at": self._to_iso(row["created_at"]) if row.get("created_at") else None,
            "scheduled": row.get("scheduled", False),
            "scheduled_at": self._to_iso(row["scheduled_at"]) if row.get("scheduled_at") else None,
            "calendly_bookings": row.get("calendly_bookings", []),
        }

    def _audit_chat_row_to_dict(self, row: dict[str, Any]) -> dict[str, Any]:
        history = row.get("history", []) or []
        return {
            "session_id": row.get("session_id"),
            "history": history,
            "captured_email": row.get("captured_email"),
            "latest_intent": row.get("latest_intent"),
            "updated_at": self._to_iso(row["updated_at"]) if row.get("updated_at") else None,
            "report_emailed": row.get("report_emailed", False),
        }

    def _as_datetime(self, value: Any) -> Optional[datetime]:
        if value is None or value == "":
            return None
        if isinstance(value, datetime):
            return value if value.tzinfo else value.replace(tzinfo=timezone.utc)
        if isinstance(value, str):
            normalized = value.replace("Z", "+00:00")
            parsed = datetime.fromisoformat(normalized)
            return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
        raise TypeError(f"Unsupported datetime value: {value!r}")

    def _to_iso(self, value: datetime) -> str:
        if value is None:
            return ""
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)
        return value.astimezone(timezone.utc).isoformat()

    def _parse_db_name_from_url(self, url: str) -> Optional[str]:
        try:
            parsed = urlparse(url)
            if parsed.path and parsed.path != "/":
                return parsed.path.lstrip("/")
        except Exception:
            pass
        return None
