'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ph_sale_end';

function getOrCreateEndTime() {
  if (typeof window === 'undefined') return Date.now() + 3 * 3600 * 1000;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const end = parseInt(stored, 10);
      if (end > Date.now()) return end;
    }
  } catch {}
  // Set a random end time between 1h 40m and 3h 20m from now
  const mins = 100 + Math.floor(Math.random() * 100);
  const end = Date.now() + mins * 60 * 1000;
  try { localStorage.setItem(STORAGE_KEY, String(end)); } catch {}
  return end;
}

function formatTime(ms) {
  if (ms <= 0) return { h: '00', m: '00', s: '00' };
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return { h, m, s };
}

export default function CountdownTimer() {
  const [endTime, setEndTime] = useState(null);
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const end = getOrCreateEndTime();
    setEndTime(end);
    setRemaining(end - Date.now());

    const interval = setInterval(() => {
      const diff = end - Date.now();
      if (diff <= 0) {
        // Reset for next session
        try { localStorage.removeItem(STORAGE_KEY); } catch {}
        const newEnd = getOrCreateEndTime();
        setEndTime(newEnd);
        setRemaining(newEnd - Date.now());
      } else {
        setRemaining(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (remaining === null) return null;

  const { h, m, s } = formatTime(remaining);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'linear-gradient(135deg, #fff7ed, #fef3c7)',
      border: '1.5px solid #fed7aa',
      borderRadius: 12, padding: '10px 14px',
    }}>
      <span style={{ fontSize: 16 }}>🔥</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#9a3412' }}>
        Sale ends in
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[h, m, s].map((unit, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              background: '#f97316', color: '#fff',
              fontWeight: 900, fontSize: 15, fontFamily: 'monospace',
              padding: '3px 7px', borderRadius: 6, minWidth: 32, textAlign: 'center',
              letterSpacing: '0.05em',
            }}>
              {unit}
            </span>
            {i < 2 && <span style={{ color: '#f97316', fontWeight: 900, fontSize: 15 }}>:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
