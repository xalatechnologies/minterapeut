import type { ReactNode } from "react";

import { normalizeWrappedHeadings } from "@/lib/content-sections";
import { cn } from "@/lib/utils";

export function parseInlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("***") && token.endsWith("***")) {
      parts.push(<strong key={key++}>{token.slice(3, -3)}</strong>);
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    } else {
      parts.push(token);
    }
    last = match.index + token.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts;
}

function parseInline(text: string): ReactNode[] {
  return parseInlineMarkdown(text);
}

/**
 * Renders the exact source markdown body without rewriting text.
 * Supports: # headings, ***subheads***, paragraphs, and - lists.
 */
export function SourceMarkdown({
  content,
  omitH1 = false,
  density = "reading",
  className,
}: {
  content: string;
  omitH1?: boolean;
  density?: "reading" | "clinical";
  className?: string;
}) {
  const lines = normalizeWrappedHeadings(content.replace(/\r\n/g, "\n")).split(
    "\n",
  );
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;
  let isFirstBlock = true;
  let skippedH1 = false;
  const bodyClass =
    density === "clinical"
      ? "type-body text-on-surface-variant"
      : "type-body-lg text-on-surface-variant";
  const listClass =
    density === "clinical"
      ? "mt-5 list-disc space-y-2 pl-5 type-body text-on-surface-variant marker:text-sage-deep"
      : "mt-5 list-disc space-y-2.5 pl-5 type-body-lg text-on-surface-variant marker:text-sage-deep";
  const paraGap = density === "clinical" ? "mt-4" : "mt-5";

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      const raw = line.slice(2).trim();
      if (omitH1 && !skippedH1) {
        skippedH1 = true;
        i += 1;
        continue;
      }
      blocks.push(
        <h1 key={key++} className="type-headline text-on-surface">
          {parseInline(raw)}
        </h1>,
      );
      isFirstBlock = false;
      i += 1;
      continue;
    }

    if (/^\*\*\*[^*].*\*\*\*$/.test(line.trim())) {
      const raw = line.trim().slice(3, -3);
      blocks.push(
        <h2
          key={key++}
          className={`type-title text-sage-deep ${isFirstBlock ? "mt-0" : "mt-12"}`}
        >
          {raw}
        </h2>,
      );
      isFirstBlock = false;
      i += 1;
      continue;
    }

    if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
      const raw = line.trim().slice(2, -2);
      blocks.push(
        <h2
          key={key++}
          className={`type-title text-sage-deep ${isFirstBlock ? "mt-0" : "mt-12"}`}
        >
          {raw}
        </h2>,
      );
      isFirstBlock = false;
      i += 1;
      continue;
    }

    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i += 1;
        while (
          i < lines.length &&
          lines[i].trim() !== "" &&
          !lines[i].trim().startsWith("- ") &&
          !lines[i].startsWith("#") &&
          !/^\*\*\*/.test(lines[i].trim())
        ) {
          if (lines[i].startsWith("  ") || !lines[i].trim().startsWith("-")) {
            if (lines[i].startsWith("  ")) {
              items[items.length - 1] += " " + lines[i].trim();
              i += 1;
            } else {
              break;
            }
          } else {
            break;
          }
        }
      }
      blocks.push(
        <ul key={key++} className={listClass}>
          {items.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ul>,
      );
      isFirstBlock = false;
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("# ") &&
      !/^\*\*\*[^*].*\*\*\*$/.test(lines[i].trim()) &&
      !/^\*\*[^*]+\*\*$/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith("- ")
    ) {
      para.push(lines[i].trim());
      i += 1;
    }
    blocks.push(
      <p
        key={key++}
        className={`${isFirstBlock ? "mt-0" : paraGap} ${bodyClass}`}
      >
        {parseInline(para.join(" "))}
      </p>,
    );
    isFirstBlock = false;
  }

  return <div className={cn("max-w-3xl", className)}>{blocks}</div>;
}
