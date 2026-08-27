/**
 * Shared helpers for splitting source markdown into visual sections
 * without rewriting clinical text.
 */

/**
 * Source files sometimes wrap ***headings*** across a soft line break.
 * Join those into a single line so hierarchy renders correctly.
 */
export function normalizeWrappedHeadings(content: string): string {
  return content.replace(/\*\*\*([\s\S]*?)\*\*\*/g, (match, inner: string) => {
    if (/\n\s*\n/.test(inner)) return match;
    return `***${inner.replace(/\s*\n\s*/g, " ").trim()}***`;
  });
}

export function isMarkdownHeading(line: string) {
  const trimmed = line.trim();
  return (
    /^\*\*\*[^*].*\*\*\*$/.test(trimmed) || /^\*\*[^*]+\*\*$/.test(trimmed)
  );
}

export function isContactHeading(line: string) {
  const raw = line
    .trim()
    .replace(/^\*+/, "")
    .replace(/\*+$/, "")
    .trim()
    .toLowerCase();
  return (
    raw === "contact" ||
    raw === "kontakt" ||
    raw === "contacte" ||
    raw.startsWith("contact")
  );
}

export function extractH1(content: string): {
  title: string;
  body: string;
} {
  const normalized = normalizeWrappedHeadings(content.replace(/\r\n/g, "\n"));
  const lines = normalized.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;

  if (i < lines.length && lines[i].startsWith("# ")) {
    const title = lines[i].slice(2).trim().replace(/^\*+|\*+$/g, "").trim();
    i += 1;
    while (i < lines.length && lines[i].trim() === "") i += 1;
    return { title, body: lines.slice(i).join("\n") };
  }

  return { title: "", body: normalized };
}

export type ContentChunk = {
  markdown: string;
  kind: "content" | "contact";
};

/** Split body at *** / ** headings into chunks. */
export function splitAtHeadings(body: string): ContentChunk[] {
  const lines = normalizeWrappedHeadings(body.replace(/\r\n/g, "\n")).split(
    "\n",
  );
  const sections: ContentChunk[] = [];
  let current: string[] = [];

  const flush = () => {
    const markdown = current.join("\n").trim();
    if (!markdown) {
      current = [];
      return;
    }
    const firstLine = markdown.split("\n")[0] ?? "";
    sections.push({
      markdown,
      kind: isContactHeading(firstLine) ? "contact" : "content",
    });
    current = [];
  };

  for (const line of lines) {
    if (isMarkdownHeading(line) && current.length > 0) {
      flush();
    }
    current.push(line);
  }
  flush();

  if (sections.length === 0 && body.trim()) {
    sections.push({ markdown: body.trim(), kind: "content" });
  }

  return sections;
}
