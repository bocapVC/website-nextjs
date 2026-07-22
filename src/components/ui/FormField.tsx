import type { ReactNode, SelectHTMLAttributes } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const controlClasses =
  "w-full rounded-brand-sm border border-line bg-surface-solid px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30";

interface FieldShellProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Labeled wrapper shared by the input/select/textarea variants below. */
function FieldShell({ label, htmlFor, required, hint, children, className }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-0.5 text-red">*</span> : null}
      </label>
      {children}
      {hint ? <span className="text-xs text-ink-soft">{hint}</span> : null}
    </div>
  );
}

type InputFieldProps = {
  label: string;
  hint?: ReactNode;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({ label, hint, className, id, required, ...rest }: InputFieldProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldShell label={label} htmlFor={fieldId} required={required} hint={hint} className={className}>
      <input id={fieldId} required={required} className={controlClasses} {...rest} />
    </FieldShell>
  );
}

type TextareaFieldProps = {
  label: string;
  hint?: ReactNode;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextareaField({
  label,
  hint,
  className,
  id,
  required,
  rows = 5,
  ...rest
}: TextareaFieldProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldShell label={label} htmlFor={fieldId} required={required} hint={hint} className={className}>
      <textarea
        id={fieldId}
        required={required}
        rows={rows}
        className={cn(controlClasses, "resize-y")}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  label: string;
  hint?: ReactNode;
  className?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({
  label,
  hint,
  className,
  id,
  required,
  options,
  placeholder,
  ...rest
}: SelectFieldProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldShell label={label} htmlFor={fieldId} required={required} hint={hint} className={className}>
      <select id={fieldId} required={required} className={controlClasses} {...rest}>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
