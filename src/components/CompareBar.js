'use client';
import { useCompare } from '@/context/CompareContext';
import { products } from '@/lib/products';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CompareBar() {
  const { ids, toggle, clear, count } = useCompare();
  const router = useRouter();

  if (count === 0) return null;

  const selected = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[250] px-4 pb-4 sm:px-6"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="max-w-3xl mx-auto bg-navy-900 text-white rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Products row */}
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          <span className="text-xs text-gray-400 font-medium flex-shrink-0">Comparing:</span>
          {selected.map((p) => (
            <div key={p.id} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.name} fill sizes="28px" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base">{p.emoji}</div>
                )}
              </div>
              <span className="text-xs font-medium max-w-[100px] truncate">{p.name}</span>
              <button
                onClick={() => toggle(p.id)}
                className="text-white/50 hover:text-white ml-1 text-base leading-none transition-colors"
                aria-label={`Remove ${p.name} from comparison`}
              >
                ×
              </button>
            </div>
          ))}
          {count < 3 && (
            <span className="text-xs text-gray-500 italic">
              {3 - count} more slot{3 - count !== 1 ? 's' : ''} available
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={clear}
            className="text-gray-400 hover:text-white text-xs font-medium transition-colors"
          >
            Clear
          </button>
          <button
            disabled={count < 2}
            onClick={() => router.push(`/compare?ids=${ids.join(',')}`)}
            className="bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors active:scale-95"
          >
            Compare {count} Products →
          </button>
        </div>
      </div>
    </div>
  );
}
