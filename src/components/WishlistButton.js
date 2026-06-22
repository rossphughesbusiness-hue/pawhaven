'use client';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistButton({ product, size = 'md', className = '' }) {
  const { isWishlisted, toggle } = useWishlist();
  const saved = isWishlisted(product.id);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const iconSize = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4.5 w-4.5',
    lg: 'h-5 w-5',
  };

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      title={saved ? 'Remove from wishlist' : 'Save for later'}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center rounded-full
        transition-all duration-200 active:scale-90
        ${saved
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-sm'
        }
        ${className}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSize[size] || 'h-4 w-4'} transition-transform duration-200 ${saved ? 'scale-110' : ''}`}
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={saved ? 0 : 2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
