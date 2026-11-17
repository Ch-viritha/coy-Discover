import fs from 'fs';
import path from 'path';
const FILE = path.join(process.cwd(), 'data', 'db.json');
const N = ['Aanya','Rohan','Meera','Kabir','Isha','Arjun','Naina','Vihaan','Tara','Dev','Zoya','Aarav','Riya','Kian','Sana','Ishaan','Anika','Veer','Diya','Reyansh','Mira','Neil','Kiara','Samar','Anvi','Yash','Pooja','Ayaan','Tanvi','Krish','Ritika','Omkar'];
const C = ['IIT Delhi','DU North Campus','Gurgaon','BITS Pilani','Hyderabad','Bangalore','Mumbai','NSUT','Jaipur','Pune','Ashoka Univ','IIIT Hyderabad'];
const I = ['Indie music','Chai','Football','Standup','Anime','Trekking','Photography','Startups','Poetry','Gaming','Cooking','Cricket','Road trips','Coffee','Dance','Books','Memes','Yoga','Film','Skating'];
const B = ['Will trade my playlist for your best chai spot.','Overthinks texts, overpacks bags.','Tell me your unpopular opinion.','Probably at a cafe pretending to study.','Looking for someone to get lost with.','Sunsets, snacks, and sarcasm.','Ask me about my 5am trek story.','Soft heart, loud laugh.'];
export const ME = { id: 'me', name: 'You', interests: ['Indie music','Chai','Startups','Trekking','Film'] };
function seed() {
  const profiles = N.map((name, i) => ({
    id: 'p' + (i + 1), name, age: 19 + (i * 3) % 8, city: C[(i * 5) % C.length], hue: (i * 47) % 360,
    bio: B[(i * 3) % B.length],
    interests: [0, 1, 2, 3].map(k => I[(i * 3 + k * 5 + (i % 3)) % I.length]).filter((v, j, a) => a.indexOf(v) === j),
  }));
  // PRIVATE: who already liked the user. Never leaves the server.
  const likedMe = profiles.filter((_, i) => i % 4 === 1 || i === 6).map(p => p.id);
  return { profiles, likedMe, swipes: {}, matches: [] };
}
export function load() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { const d = seed(); save(d); return d; }
}
export function save(d) { fs.mkdirSync(path.dirname(FILE), { recursive: true }); fs.writeFileSync(FILE, JSON.stringify(d)); }
// Public projection: no likedMe info, ever.
export function pub(p) {
  const common = p.interests.filter(x => ME.interests.includes(x));
  return { id: p.id, name: p.name, age: p.age, city: p.city, hue: p.hue, bio: p.bio, interests: p.interests, common };
}
