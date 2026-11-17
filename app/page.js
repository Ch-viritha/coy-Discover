'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
const THRESH = 110;
const grad = h => `linear-gradient(160deg,hsl(${h} 70% 62%),hsl(${(h + 50) % 360} 60% 38%))`;
const api = (u, o) => fetch(u, o).then(r => r.json());

function Card({ p, top, onSwipe, exitDir }) {
  const [dx, setDx] = useState(0); const start = useRef(null);
  const drag = e => { if (start.current !== null) setDx(e.clientX - start.current); };
  const end = () => { if (start.current === null) return; start.current = null; Math.abs(dx) > THRESH ? onSwipe(dx > 0 ? 'like' : 'pass') : setDx(0); };
  const x = exitDir ? (exitDir === 'like' ? 700 : -700) : dx;
  const tilt = x / 18, like = Math.min(Math.max(x / THRESH, 0), 1), pass = Math.min(Math.max(-x / THRESH, 0), 1);
  return (
    <div className={'card ' + (top ? 'top' : 'under') + (exitDir ? ' exit' : '') + (start.current === null && !exitDir ? ' settle' : '')}
      style={top ? { transform: `translateX(${x}px) rotate(${tilt}deg)` } : undefined}
      onPointerDown={e => { if (!top) return; start.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={drag} onPointerUp={end} onPointerCancel={end}>
      <div className="photo" style={{ background: grad(p.hue) }}><span>{p.name[0]}</span></div>
      <div className="stamp like" style={{ opacity: like }}>CRUSH</div>
      <div className="stamp pass" style={{ opacity: pass }}>PASS</div>
      <div className="info">
        <h2>{p.name}<i>, {p.age}</i></h2>
        <p className="city">{p.city}</p>
        <p className="bio">“{p.bio}”</p>
        <div className="chips">{p.interests.map(t => <b key={t} className={p.common.includes(t) ? 'hit' : ''}>{t}</b>)}</div>
        {p.common.length > 0 && <p className="common">✦ {p.common.length} thing{p.common.length > 1 ? 's' : ''} in common</p>}
      </div>
    </div>);
}

export default function App() {
  const [tab, setTab] = useState('discover'); const [feed, setFeed] = useState(null);
  const [matches, setMatches] = useState([]); const [exit, setExit] = useState(null); const [match, setMatch] = useState(null);
  const busy = useRef(false);
  const refresh = useCallback(async () => { setFeed(await api('/api/feed')); setMatches(await api('/api/matches')); }, []);
  useEffect(() => { refresh(); }, [refresh]);
  const swipe = useCallback(async action => {
    if (busy.current || !feed?.length) return; busy.current = true;
    const p = feed[0]; setExit(action);
    const res = await api('/api/swipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profileId: p.id, action }) });
    setTimeout(() => { setFeed(f => f.slice(1)); setExit(null); busy.current = false; if (res.match) { setMatch(res.profile); api('/api/matches').then(setMatches); } }, 280);
  }, [feed]);
  useEffect(() => {
    const k = e => { if (tab !== 'discover' || match) return; if (e.key === 'ArrowRight') swipe('like'); if (e.key === 'ArrowLeft') swipe('pass'); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [swipe, tab, match]);

  return (<main>
    <header><div className="logo">coy<span>.</span></div><p>Nobody sees who liked them. <em>Until it’s mutual.</em></p></header>
    <section className="stage">
      {tab === 'home' && <div className="blank" />}
      {tab === 'discover' && (feed === null ? <p className="muted">Opening your envelopes…</p> :
        feed.length === 0 ? <div className="empty"><div className="seal big">♥</div><h3>That’s everyone, for now.</h3><p>Every envelope is opened. New people drop in soon — your matches are waiting.</p><button className="ghost" onClick={() => setTab('matches')}>See matches</button></div> :
        <>
          <div className="deck">{feed.slice(0, 2).reverse().map(p => <Card key={p.id} p={p} top={p.id === feed[0].id} exitDir={p.id === feed[0].id ? exit : null} onSwipe={swipe} />)}</div>
          <div className="actions">
            <button className="round no" aria-label="Pass" onClick={() => swipe('pass')}>✕</button>
            <button className="round yes" aria-label="Like" onClick={() => swipe('like')}>♥</button>
          </div>
          <p className="hint muted">drag the card · or use ← → keys · {feed.length} left</p>
        </>)}
      {tab === 'matches' && (matches.length === 0 ? <div className="empty"><h3>No matches yet.</h3><p>When a crush is mutual, it lands here — sealed with wax.</p></div> :
        <ul className="letters">{matches.map(m => <li key={m.id}><div className="av" style={{ background: grad(m.hue) }}>{m.name[0]}</div>
          <div><h4>{m.name}, {m.age}</h4><p>{m.city} · {m.common.length ? m.common.join(', ') : 'matched ' + new Date(m.matchedAt).toLocaleDateString()}</p></div><div className="seal">♥</div></li>)}</ul>)}
    </section>
    <nav>{['home', 'discover', 'matches'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}{t === 'matches' && matches.length > 0 && <sup>{matches.length}</sup>}</button>)}</nav>
    {match && <div className="match" onClick={() => setMatch(null)}>
      <div className="env"><div className="av lg" style={{ background: grad(match.hue) }}>{match.name[0]}</div><div className="seal burst">♥</div><div className="av lg" style={{ background: grad(300) }}>Y</div></div>
      <h1>It’s a match!</h1><p>You and {match.name} both picked each other. The seal is broken.</p>
      <button className="solid" onClick={() => setMatch(null)}>Keep swiping</button></div>}
  </main>);
}
