import { load, save, pub } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  const { profileId, action } = await req.json().catch(() => ({}));
  if (!['like', 'pass'].includes(action)) return Response.json({ error: 'action must be like|pass' }, { status: 400 });
  const d = load();
  const p = d.profiles.find(x => x.id === profileId);
  if (!p) return Response.json({ error: 'unknown profile' }, { status: 404 });
  if (d.swipes[profileId]) return Response.json({ match: d.matches.some(m => m.id === profileId), duplicate: true });
  d.swipes[profileId] = action;
  // Match only when BOTH sides liked. Response says nothing otherwise.
  const match = action === 'like' && d.likedMe.includes(profileId);
  if (match) d.matches.push({ id: profileId, at: Date.now() });
  save(d);
  return Response.json(match ? { match: true, profile: pub(p) } : { match: false });
}
