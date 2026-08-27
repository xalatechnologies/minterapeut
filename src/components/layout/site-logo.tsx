import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  /** Hide the wordmark — mark only */
  markOnly?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { mark: "h-8 w-8", text: "text-[1.125rem]", gap: "gap-2.5" },
  md: { mark: "h-9 w-9", text: "text-[1.35rem]", gap: "gap-3" },
  lg: { mark: "h-11 w-11", text: "text-[1.5rem]", gap: "gap-3.5" },
} as const;

/**
 * Brand lockup: calm path mark + serif wordmark.
 * Wordmark follows currentColor; the seal stays sage for recognition.
 */
export function SiteLogo({
  className,
  markOnly = false,
  size = "md",
}: SiteLogoProps) {
  const s = sizeMap[size];

  return (
    <span
      className={cn(
        "inline-flex items-center text-current",
        s.gap,
        className,
      )}
    >
      <LogoMark className={cn("shrink-0", s.mark)} />
      {markOnly ? null : (
        <span
          className={cn(
            "font-serif font-semibold tracking-tight leading-none",
            s.text,
          )}
        >
          {siteConfig.brand}
        </span>
      )}
    </span>
  );
}

/** Path toward light — forest uprights + journey curve. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden
    >
      <rect width="40" height="40" rx="11" fill="#2F4F52" />

      {/* Soft forest uprights */}
      <path
        d="M13 28.5V15"
        stroke="#F7FAFC"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M17.25 28.5V11.5"
        stroke="#F7FAFC"
        strokeWidth="1.85"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M21.5 28.5V14"
        stroke="#F7FAFC"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Path toward clarity */}
      <path
        d="M11 28.75C14.8 24.4 18.6 22.2 27.2 20.2"
        stroke="#F7FAFC"
        strokeWidth="2.1"
        strokeLinecap="round"
      />

      {/* Light / opening */}
      <circle cx="28.6" cy="19.4" r="3.4" fill="#F7FAFC" />
      <circle
        cx="28.6"
        cy="19.4"
        r="5.6"
        stroke="#F7FAFC"
        strokeWidth="1"
        opacity="0.28"
        fill="none"
      />
    </svg>
  );
}
