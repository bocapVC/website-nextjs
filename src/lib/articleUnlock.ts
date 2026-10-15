/**
 * Unlock state for protected publications. One email unlocks every protected
 * article on this browser for 3 months. Only the expiry timestamp is stored —
 * never the email. Storage that throws (private mode, blocked cookies) or is
 * empty reads as locked; it never breaks the page.
 *
 * This is lead capture, not access control: the PDFs stay public static files.
 */

const STORAGE_KEY = "bocap:publicaciones-unlocked-until";
const UNLOCK_MONTHS = 3;

export function isUnlocked(now: Date = new Date()): boolean {
  try {
    const until = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(until) && until > now.getTime();
  } catch {
    return false;
  }
}

export function markUnlocked(now: Date = new Date()): void {
  const until = new Date(now);
  until.setMonth(until.getMonth() + UNLOCK_MONTHS);
  try {
    window.localStorage.setItem(STORAGE_KEY, String(until.getTime()));
  } catch {
    // Storage unavailable: the current click still downloads, the next one asks again.
  }
}

/** Starts a same-origin file download without navigating away from the page. */
export function triggerDownload(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
