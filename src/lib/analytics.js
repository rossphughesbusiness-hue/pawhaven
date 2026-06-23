/**
 * PawHaven Analytics Utility
 * Fires GA4, Meta Pixel, and TikTok Pixel events consistently.
 * All functions are safe to call server-side (no-ops when window is undefined).
 */

function gtag(...args) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

function fbq(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  }
}

function ttq(event, data) {
  if (typeof window !== 'undefined' && typeof window.ttq !== 'undefined') {
    window.ttq.track(event, data);
  }
}

/**
 * Fire when a product page is viewed.
 * Call this in a useEffect on the product page.
 */
export function trackViewItem(product) {
  const item = {
    item_id: String(product.id),
    item_name: product.name,
    item_category: product.category,
    item_variant: product.tag,
    price: product.price,
    currency: 'USD',
  };

  gtag('event', 'view_item', {
    currency: 'USD',
    value: product.price,
    items: [item],
  });

  fbq('track', 'ViewContent', {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_category: product.category,
    content_type: 'product',
    value: product.price,
    currency: 'USD',
  });

  ttq('ViewContent', {
    content_id: String(product.id),
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'USD',
  });
}

/**
 * Fire when a product is added to the cart.
 */
export function trackAddToCart(product, quantity = 1) {
  const item = {
    item_id: String(product.id),
    item_name: product.name,
    item_category: product.category,
    item_variant: product.tag,
    price: product.price,
    quantity,
    currency: 'USD',
  };

  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: product.price * quantity,
    items: [item],
  });

  fbq('track', 'AddToCart', {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: 'product',
    value: product.price * quantity,
    currency: 'USD',
    num_items: quantity,
  });

  ttq('AddToCart', {
    content_id: String(product.id),
    content_name: product.name,
    content_type: 'product',
    quantity,
    value: product.price * quantity,
    currency: 'USD',
  });
}

/**
 * Fire when the user clicks "Proceed to Checkout".
 */
export function trackBeginCheckout(cartItems, total) {
  const items = cartItems.map((item) => ({
    item_id: String(item.id),
    item_name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: total,
    items,
  });

  fbq('track', 'InitiateCheckout', {
    value: total,
    currency: 'USD',
    num_items: cartItems.reduce((s, i) => s + i.quantity, 0),
  });

  ttq('InitiateCheckout', {
    value: total,
    currency: 'USD',
  });
}

/**
 * Fire when a product is removed from the cart.
 */
export function trackRemoveFromCart(product, quantity = 1) {
  gtag('event', 'remove_from_cart', {
    currency: 'USD',
    value: product.price * quantity,
    items: [{
      item_id: String(product.id),
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity,
    }],
  });
}

/**
 * Fire when the user adds something to their wishlist.
 */
export function trackAddToWishlist(product) {
  gtag('event', 'add_to_wishlist', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: String(product.id),
      item_name: product.name,
      price: product.price,
    }],
  });

  fbq('track', 'AddToWishlist', {
    content_ids: [String(product.id)],
    content_name: product.name,
    value: product.price,
    currency: 'USD',
  });
}
