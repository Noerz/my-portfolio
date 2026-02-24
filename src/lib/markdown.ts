const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const applyInlineFormatting = (value: string): string => {
  return value
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
};

export const markdownToHtml = (markdown: string): string => {
  const lines = markdown.split("\n");
  let html = "";
  let inCodeBlock = false;
  let codeLang = "";
  let codeLines: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    const text = paragraphLines.join(" ").trim();
    const escaped = applyInlineFormatting(escapeHtml(text));
    html += `<p>${escaped}</p>`;
    paragraphLines = [];
  };

  const closeList = () => {
    if (!inList) return;
    html += `</${listType}>`;
    inList = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");

    if (inCodeBlock) {
      if (line.startsWith("```")) {
        const code = escapeHtml(codeLines.join("\n"));
        const langClass = codeLang ? ` class=\"language-${codeLang}\"` : "";
        html += `<pre><code${langClass}>${code}</code></pre>`;
        inCodeBlock = false;
        codeLang = "";
        codeLines = [];
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      inCodeBlock = true;
      codeLang = line.slice(3).trim();
      continue;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      closeList();
      html += `<h1>${applyInlineFormatting(escapeHtml(trimmed.slice(2).trim()))}</h1>`;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      closeList();
      html += `<h2>${applyInlineFormatting(escapeHtml(trimmed.slice(3).trim()))}</h2>`;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      closeList();
      html += `<h3>${applyInlineFormatting(escapeHtml(trimmed.slice(4).trim()))}</h3>`;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      closeList();
      const quote = applyInlineFormatting(escapeHtml(trimmed.slice(2).trim()));
      html += `<blockquote><p>${quote}</p></blockquote>`;
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+/);
    if (unorderedMatch) {
      flushParagraph();
      if (!inList || listType !== "ul") {
        closeList();
        html += "<ul>";
        inList = true;
        listType = "ul";
      }
      const item = trimmed.replace(/^[-*]\s+/, "");
      html += `<li>${applyInlineFormatting(escapeHtml(item))}</li>`;
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+/);
    if (orderedMatch) {
      flushParagraph();
      if (!inList || listType !== "ol") {
        closeList();
        html += "<ol>";
        inList = true;
        listType = "ol";
      }
      const item = trimmed.replace(/^\d+\.\s+/, "");
      html += `<li>${applyInlineFormatting(escapeHtml(item))}</li>`;
      continue;
    }

    paragraphLines.push(trimmed);
  }

  if (inCodeBlock) {
    const code = escapeHtml(codeLines.join("\n"));
    const langClass = codeLang ? ` class=\"language-${codeLang}\"` : "";
    html += `<pre><code${langClass}>${code}</code></pre>`;
  }

  flushParagraph();
  closeList();

  return html;
};
