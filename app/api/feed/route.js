import { load, pub } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function GET() {
  const d = load();
  return Response.json(d.profiles.filter(p => !d.swipes[p.id]).map(pub));
}
