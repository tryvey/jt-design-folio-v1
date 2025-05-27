// Pure and utility functions for the app

// Parse frontmatter from markdown text
export function parseFrontmatter(text) {
  const match = text.match(/^---([\s\S]*?)---/);
  let metaObj = {};
  let body = text;
  if (match) {
    const metaStr = match[1];
    metaStr.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) metaObj[key.trim()] = rest.join(':').trim();
    });
    body = text.replace(/^---([\s\S]*?)---/, '').trim();
  }
  return { meta: metaObj, body };
}

// Parse case studies from a markdown file (legacy, not used for file-per-case-study)
export function parseCaseStudies(md) {
  return md
    .split('---')
    .map((block) => {
      const titleMatch = block.match(/### (.+)/);
      const imgMatch = block.match(/!\[[^\]]*\]\(([^)]+)\)/);
      const descMatch = block.match(/\)\n([^[]+)/);
      const linkMatch = block.match(/\[View on Figma\]\(([^)]+)\)/);
      return titleMatch && imgMatch && descMatch && linkMatch
        ? {
            title: titleMatch[1].trim(),
            image: imgMatch[1].trim(),
            desc: descMatch[1].trim(),
            link: linkMatch[1].trim(),
          }
        : null;
    })
    .filter(Boolean);
}

// Helper to get brand color by title
export function getBrandColor(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("open universities")) return "#4052B5";
  if (lowerTitle.includes("marvel stadium")) return "#4D2230";
  if (lowerTitle.includes("xero")) return "#13B5EA";
  if (lowerTitle.includes("post") || lowerTitle.includes("australia post")) return "#000000";
  if (lowerTitle.includes("vision") || lowerTitle.includes("apple")) return "#000000";
  return "#333333";
}
