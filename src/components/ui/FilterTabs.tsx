import { cn } from "@/lib/cn";

interface FilterTabsProps<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  /** Display text per tab when it differs from the value (e.g. a plural). */
  labels?: Partial<Record<T, string>>;
  className?: string;
}

/** Underlined row of filter buttons over a card grid; the active tab gets the red rule. */
export function FilterTabs<T extends string>({
  tabs,
  active,
  onChange,
  labels,
  className,
}: FilterTabsProps<T>) {
  return (
    <div className={cn("flex flex-wrap gap-6 border-b border-line-strong", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          aria-current={active === tab}
          className={cn(
            "border-b-2 pb-4 text-sm font-semibold uppercase tracking-wide transition-colors",
            active === tab
              ? "border-red text-ink"
              : "border-transparent text-ink-soft hover:text-ink",
          )}
        >
          {labels?.[tab] ?? tab}
        </button>
      ))}
    </div>
  );
}
