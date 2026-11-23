import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "peer w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-0 aria-[invalid=true]:border-destructive";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Field({ id, label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="eyebrow text-[0.62rem] text-muted-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 normal-case tracking-normal text-muted-foreground/60">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(control, "h-12", className)} {...props} />,
);
TextInput.displayName = "TextInput";

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(control, "min-h-32 resize-y", className)} {...props} />,
);
TextArea.displayName = "TextArea";

export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        control,
        "h-12 cursor-pointer appearance-none bg-[length:14px] bg-[right_0.25rem_center] bg-no-repeat pr-8 [&>option]:bg-popover [&>option]:text-popover-foreground",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c9894f' stroke-width='1.5'><path d='m6 9 6 6 6-6'/></svg>\")",
      }}
      {...props}
    >
      {children}
    </select>
  ),
);
SelectInput.displayName = "SelectInput";
