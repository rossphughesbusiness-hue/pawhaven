import { redirect } from 'next/navigation';

/**
 * The old flash-sale page used a fake rolling countdown and fabricated
 * compare-at prices. Permanently removed; redirects to the shop.
 */
export default function SalePage() {
  redirect('/products');
}
