import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "book" | "onDark";
  className?: string;
  size?: "default" | "sm";
};

const styles = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container shadow-[var(--shadow-soft)]",
  secondary:
    "bg-secondary text-on-secondary hover:bg-sage-deep shadow-[var(--shadow-soft)]",
  outline:
    "border border-outline-variant/60 bg-surface-container-lowest text-on-surface-variant hover:border-sage-deep hover:text-sage-deep",
  book: "bg-[#1a1f1e] text-white hover:bg-black shadow-[var(--shadow-soft)]",
  onDark:
    "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  size = "default",
}: ButtonLinkProps) {
  const classNames = cn(
    "type-label inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition",
    size === "sm" ? "h-10 px-5" : "min-h-11 px-6 py-3",
    styles[variant],
    className,
  );

  if (
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href as "/"} className={classNames}>
      {children}
    </Link>
  );
}
