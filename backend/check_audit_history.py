import os
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from database import Database

load_dotenv(Path('.env'))
print('MONGODB_URL', os.getenv('MONGODB_URL'))
print('DATABASE_URL', os.getenv('DATABASE_URL'))

async def main():
    db = Database()
    await db.connect()
    cursor = db.audit_chats.find({}, {"session_id": True, "history": True, "_id": False}).sort("updated_at", -1).limit(5)
    rows = [row async for row in cursor]
    print('ROWCOUNT', len(rows))
    for row in rows:
        print('SESSION', row.get('session_id'))
        history = row.get('history', []) or []
        print('HISTORY_LEN', len(history))
        for i, turn in enumerate(history):
            print('TURN', i, turn.get('role'), repr(turn.get('content')[:200]))
        print('---')
    await db.close()

asyncio.run(main())
