import os
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from database import Database

load_dotenv(Path('.env'))

async def main():
    db = Database()
    await db.connect()
    rows = db.audit_chats.find({}, {"session_id": True, "history": True, "_id": False}).sort("updated_at", -1).limit(2)
    async for row in rows:
        print('SESSION', row.get('session_id'))
        history = row.get('history', [])
        print('HISTORY TYPE', type(history).__name__, 'LEN', len(history))
        for i, turn in enumerate(history[:20]):
            print('TURN', i, type(turn).__name__, repr(turn) if isinstance(turn, str) else (turn.get('role'), turn.get('content')[:200]))
        print('---')
    await db.close()

asyncio.run(main())
