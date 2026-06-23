'use client';

import { useState, useEffect } from 'react';

export default function ViewerCount({ productId }) {
  const [viewers, setViewers] = useState(null);

  useEffect(() => {
    let mounted = true;

    function fetchViewers() {
      fetch(`/api/viewers/${productId}`)
        .then((r) => r.json())
        .then(({ viewers: v }) => {
          if (mounted) setViewers(v);
        })
        .catch(() => {});
    }

    // Small delay so it "loads in" naturally
    const timer = setTimeout(fetchViewers, 1200);

    // Refresh every 45 seconds with slight random drift to feel live
    const interval = setInterval(() => {
      setViewers((prev) => {
        if (!prev) return prev;
        const drift = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(2, Math.min(30, prev + drift));
      });
    }, 45_000);

    return () => {
      mounted = false;
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [productId]);

  if (!viewers) return null;

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-rose-600 animate-pulse-slow">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
      </span>
      {viewers} people viewing this right now
    </div>
  );
}
