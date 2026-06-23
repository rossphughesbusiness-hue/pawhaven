'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TrackOrderLink() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return null;

  return (
    <Link
      href={`/order-tracking?session_id=${encodeURIComponent(sessionId)}`}
      style={{
        fontSize: 14, color: '#f97316', fontWeight: 600,
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
      }}
    >
      📦 Track your order →
    </Link>
  );
}
