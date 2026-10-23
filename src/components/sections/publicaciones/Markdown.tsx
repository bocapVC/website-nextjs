import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink } from "@/components/ui/ExternalLink";

const linkClasses = "font-medium text-teal underline hover:text-teal-strong";

// The page title is the only h1, so a body "Título 1" renders one level down.
const components: Components = {
  h1: ({ children }) => <h2 className="mt-12 font-serif text-3xl font-bold leading-tight text-ink">{children}</h2>,
  h2: ({ children }) => <h2 className="mt-12 font-serif text-3xl font-bold leading-tight text-ink">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-10 font-serif text-2xl font-bold leading-tight text-ink">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-8 font-serif text-xl font-bold text-ink">{children}</h4>,
  h5: ({ children }) => <h5 className="mt-8 font-semibold text-ink">{children}</h5>,
  h6: ({ children }) => <h6 className="mt-8 font-semibold text-ink">{children}</h6>,
  p: ({ children }) => <p className="mt-5 text-ink">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-ink marker:text-ink-soft">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-ink marker:text-ink-soft">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-red pl-5 font-serif text-xl italic text-ink [&>p]:mt-3 [&>p:first-child]:mt-0">
      {children}
    </blockquote>
  ),
  a: ({ href = "", children }) =>
    /^https?:\/\//.test(href) ? (
      <ExternalLink href={href} className={linkClasses}>
        {children}
      </ExternalLink>
    ) : (
      <a href={href} className={linkClasses}>
        {children}
      </a>
    ),
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element -- editor-uploaded image of unknown size; next/image needs dimensions.
      <img src={src} alt={alt ?? ""} loading="lazy" className="mt-6 h-auto w-full rounded-brand-sm" />
    ) : null,
  hr: () => <hr className="mt-10 border-line" />,
  code: ({ children }) => <code className="rounded bg-paper-strong px-1.5 py-0.5 text-[0.9em]">{children}</code>,
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-brand-sm bg-paper-strong p-4 text-sm [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-ink">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-line-strong px-3 py-2 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-line px-3 py-2">{children}</td>,
};

/**
 * Renders a publication body written in the panel's rich-text editor (Markdown).
 * Raw HTML in the source is escaped, not rendered — react-markdown's default.
 */
export function Markdown({ source }: { source: string }) {
  return (
    <div className="text-[1.0625rem] leading-relaxed [&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
