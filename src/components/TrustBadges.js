const BADGES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Secure Checkout',
    sub: 'SSL encrypted',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    label: '30-Day Returns',
    sub: 'Hassle-free',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    label: 'Free Shipping',
    sub: 'On orders $35+',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: '5–12 Day Delivery',
    sub: 'Tracked orders',
  },
];

export default function TrustBadges({ compact = false }) {
  if (compact) {
    // Inline row for product pages
    return (
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '12px 20px',
        padding: '14px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0',
      }}>
        {BADGES.map((b) => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ color: '#f97316', flexShrink: 0 }}>{b.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{b.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Full card grid for cart / checkout
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10,
    }}>
      {BADGES.map((b) => (
        <div key={b.label} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#f8fafc', borderRadius: 10, padding: '10px 12px',
        }}>
          <span style={{ color: '#f97316', flexShrink: 0 }}>{b.icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a2b4a' }}>{b.label}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
