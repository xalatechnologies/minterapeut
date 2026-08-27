import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site-config";

export function ContactActions({
  bookLabel,
  showBook = true,
}: {
  bookLabel?: string;
  showBook?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      {showBook && bookLabel ? (
        <ButtonLink href="/timebestilling" variant="primary">
          {bookLabel}
        </ButtonLink>
      ) : null}
      <ButtonLink href={siteConfig.phoneHref} variant="book">
        {siteConfig.phone}
      </ButtonLink>
      <ButtonLink href={siteConfig.emailHref} variant="outline">
        {siteConfig.email}
      </ButtonLink>
    </div>
  );
}
