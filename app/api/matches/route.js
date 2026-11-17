import { load, pub } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function GET() {
  const d = load();
  return Response.json(d.matches.slice().reverse().map(m => ({ ...pub(d.profiles.find(p => p.id === m.id)), matchedAt: m.at })));
}
