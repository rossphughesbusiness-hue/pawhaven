'use client';

import { useState } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-navy-900 text-white text-sm font-semibold py-2.5 px-4 flex items-center justify-center gap-3 relative">
      <span>
        🎉 New customers get <span className="text-brand-400">10% off</span> — use code{' '}
        <span className="bg-brand-500 text-white px-2 py-0.5 rounded font-black tracking-wider text-xs">
          WELCOME10
        </span>{' '}
        at checkout · Free shipping on orders $50+
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
