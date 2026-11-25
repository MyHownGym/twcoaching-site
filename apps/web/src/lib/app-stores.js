export const APP_STORE_URL = 'https://apps.apple.com/ch/app/ekklo/id6499107970?l=fr-FR';
// Replace with the exact Ekklo listing (play.google.com/store/apps/details?id=...) when known.
export const PLAY_STORE_URL = 'https://play.google.com/store/search?q=ekklo&c=apps';

/** 'ios' | 'android' | null (desktop or unknown). iPadOS Safari reports itself as a Mac. */
export function detectPlatform() {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 0) return 'ios';
  return null;
}

/** Opens the right store on a phone or tablet; returns false on desktop so the caller can show both. */
export function openStore() {
  const platform = detectPlatform();
  if (!platform) return false;
  window.location.href = platform === 'ios' ? APP_STORE_URL : PLAY_STORE_URL;
  return true;
}
