/* ═══════════════════════════════════════════════════════════════
   DJfilm · Hub — hub.js
   ═══════════════════════════════════════════════════════════════ */

/**
 * Staggered reveal on page load.
 * Each [data-reveal] element animates in with its own delay
 * defined via data-delay="Nms" (fallback: 80ms × index).
 */
document.addEventListener('DOMContentLoaded', () => {

  const items = document.querySelectorAll('[data-reveal]');

  items.forEach((el, i) => {
    const rawDelay = el.dataset.delay;
    const delay    = rawDelay !== undefined ? parseInt(rawDelay, 10) : i * 80;

    setTimeout(() => {
      el.classList.add('is-visible');
    }, delay);
  });

});
