// Pure and utility functions for the app
import React from "react";
import { useTheme } from "./contexts/ThemeContext";

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
  if (lowerTitle.includes("post") || lowerTitle.includes("australia post")) return "#DC1928";
  if (lowerTitle.includes("vision") || lowerTitle.includes("apple")) return "#000000";
  return "#333333";
}

// Theme switcher component to toggle between light and dark themes
export function ThemeSwitcher({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full p-2 transition-colors text-xl text-neutral-700 dark:text-yellow-300 shadow ${className}`}
      style={{ minWidth: 40, minHeight: 40 }}
    >
      <span role="img" aria-label="Theme">
        {theme === "dark" ? (
          // Sun icon for light mode
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07-1.41-1.41M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
        ) : (
          // Moon icon for dark mode
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
        )}
      </span>
    </button>
  );
}
