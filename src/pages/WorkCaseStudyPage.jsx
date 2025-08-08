import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Footer from "../components/Footer";
import SubpageHeader from "../components/SubpageHeader";
import { parseFrontmatter } from "../utils.jsx";

// Mapping from slug to file path for case studies
export const caseStudyFiles = {
  "open-universities-australia": "/content/case-studies/open-universities-australia.md",
  "marvel-stadium": "/content/case-studies/marvel-stadium.md",
  "australia-post": "/content/case-studies/australia-post.md",
  "xero": "/content/case-studies/xero.md",
  "apple-vision-pro": "/content/case-studies/apple-vision-pro.md",
};

// CaseStudyPage component (moved from root WorkCaseStudyPage.jsx)
function CaseStudyPage({ file }) {
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
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

// Main route component
export default function WorkCaseStudyRoute() {
  const { slug } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const file = caseStudyFiles[slug];
  if (file) {
    return (
      <>
        <SubpageHeader />
        <div style={{ paddingTop: 64 }}>
          <CaseStudyPage file={file} />
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-neutral-800 dark:text-white bg-white dark:bg-neutral-900">
        Case Study Not Found
      </div>
    );
  }
}
