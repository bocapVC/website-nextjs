/** Deliberately loose: catches typos like a missing "@" or domain, not every RFC edge case. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
