/**
 * Minimal className joiner. Filters out falsy values so conditional classes
 * (`cond && "..."`) can be passed inline without extra dependencies.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
