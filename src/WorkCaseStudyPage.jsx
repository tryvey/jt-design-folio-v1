import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { parseFrontmatter } from "./utils";

export default function CaseStudyPage({ file }) {
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState({});

  useEffect(() => {
    async function fetchCaseStudy() {
      const res = await fetch(file);
      const text = await res.text();
      const { meta, body } = parseFrontmatter(text);
      setMeta(meta);
      setContent(body);
    }
    fetchCaseStudy();
  }, [file]);

  return (
    <section className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <div className="max-w-3xl mx-auto py-16 px-4">
        {meta.coverImage && (
          <img
            src={meta.coverImage}
            alt={meta.title}
            className="rounded-3xl mb-8 w-full object-cover"
            style={{ maxHeight: 320 }}
          />
        )}
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          {meta.title}
        </h1>


        <div className="text-left custom-markdown-style dark:prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
