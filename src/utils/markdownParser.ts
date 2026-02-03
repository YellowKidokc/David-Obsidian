export interface ParsedSection {
  title: string;
  content: string;
  level: number;
}

export function parseMarkdownSections(markdown: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  // Handle both \r\n and \n line endings
  const lines = markdown.split(/\r?\n/);

  let currentSection: ParsedSection | null = null;
  let currentContent: string[] = [];

  for (let line of lines) {
    // Remove any remaining \r
    line = line.replace(/\r/g, "");

    // Check for headers (## Title or ### Title)
    const headerMatch = line.match(/^(#{2,3})\s+(.+)$/);

    if (headerMatch) {
      // Save previous section
      if (currentSection) {
        currentSection.content = currentContent.join("\n").trim();
        if (currentSection.content) {
          sections.push(currentSection);
        }
      }

      // Start new section
      const level = headerMatch[1].length;
      const title = headerMatch[2].trim();
      currentSection = { title, content: "", level };
      currentContent = [];
    } else if (currentSection) {
      // Add to current section
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection && currentContent.length > 0) {
    currentSection.content = currentContent.join("\n").trim();
    if (currentSection.content) {
      sections.push(currentSection);
    }
  }

  // If no sections found, create a single section with all content
  if (sections.length === 0 && markdown.trim()) {
    sections.push({
      title: "Content",
      content: markdown,
      level: 2,
    });
  }

  return sections;
}

export function formatMarkdownContent(content: string): string {
  let formatted = content;

  // First, handle code blocks (preserve them)
  const codeBlocks: string[] = [];
  formatted = formatted.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Handle blockquotes (> text)
  const lines = formatted.split("\n");
  const processedLines: string[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];

  for (const line of lines) {
    if (line.trim().startsWith(">")) {
      inBlockquote = true;
      blockquoteContent.push(line.replace(/^>\s*/, ""));
    } else {
      if (inBlockquote) {
        processedLines.push(
          `<blockquote>${blockquoteContent.join("<br>")}</blockquote>`,
        );
        blockquoteContent = [];
        inBlockquote = false;
      }
      processedLines.push(line);
    }
  }
  if (inBlockquote) {
    processedLines.push(
      `<blockquote>${blockquoteContent.join("<br>")}</blockquote>`,
    );
  }
  formatted = processedLines.join("\n");

  // Bold: **text** or __text__
  formatted = formatted.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");

  // Italic: *text* (but not inside words)
  formatted = formatted.replace(/(?<!\w)\*([^\*\n]+?)\*(?!\w)/g, "<em>$1</em>");

  // Code: `code`
  formatted = formatted.replace(/`([^`]+?)`/g, "<code>$1</code>");

  // Links: Handle all wiki link variations first, then markdown links
  // [[link|display text]] - wiki link with custom text
  formatted = formatted.replace(
    /\[\[([^\]|]+)\|([^\]]+)\]\]/g,
    '<span class="wiki-link">$2</span>',
  );
  // [[link]] - simple wiki link
  formatted = formatted.replace(
    /\[\[([^\]]+)\]\]/g,
    '<span class="wiki-link">$1</span>',
  );
  // [text](url) - markdown link
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>',
  );

  // Convert lists properly (handle nested indentation)
  const listLines = formatted.split("\n");
  const result: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  for (const line of listLines) {
    if (line.trim().match(/^[-*]\s/)) {
      inList = true;
      const content = line.trim().replace(/^[-*]\s+/, "");
      listItems.push(`<li>${content}</li>`);
    } else {
      if (inList && listItems.length > 0) {
        result.push(`<ul>${listItems.join("")}</ul>`);
        listItems = [];
        inList = false;
      }
      result.push(line);
    }
  }
  if (inList && listItems.length > 0) {
    result.push(`<ul>${listItems.join("")}</ul>`);
  }
  formatted = result.join("\n");

  // Convert paragraphs (double line breaks)
  formatted = formatted.replace(/\n\n+/g, "</p><p>");
  formatted = "<p>" + formatted + "</p>";

  // Single line breaks within paragraphs
  formatted = formatted.replace(/\n/g, "<br>");

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    const code = block.replace(
      /```(\w*)\n?([\s\S]*?)```/g,
      "<pre><code>$2</code></pre>",
    );
    formatted = formatted.replace(`__CODE_BLOCK_${i}__`, code);
  });

  // Clean up
  formatted = formatted.replace(/<p>\s*<\/p>/g, "");
  formatted = formatted.replace(/<p><br><\/p>/g, "");
  formatted = formatted.replace(/<p><blockquote>/g, "<blockquote>");
  formatted = formatted.replace(/<\/blockquote><\/p>/g, "</blockquote>");
  formatted = formatted.replace(/<p><ul>/g, "<ul>");
  formatted = formatted.replace(/<\/ul><\/p>/g, "</ul>");

  return formatted;
}
