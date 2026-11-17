# Coy · Discover
Swipe-based "Discover" tab for Coy. Next.js 14 (App Router) + API routes, JSON-file persistence.

## Run
`npm install && npm run dev` → http://localhost:3000 (seeds itself into `data/db.json`; delete that file to reset).

## Privacy design (Coy's core promise)
- `likedMe` (who already liked the user) lives only in server state; no endpoint serialises it.
- `/api/feed` returns a public projection with no like-related field; likers are interleaved, so feed order leaks nothing.
- `/api/swipe` returns `match:true` only when both sides liked; otherwise the response is identical either way.
- Swipes are idempotent server-side, so a profile never re-appears or double-matches.

## APIs
`GET /api/feed` · `POST /api/swipe {profileId, action:"like"|"pass"}` · `GET /api/matches`
