import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Footer from "../components/Footer";
import SubpageHeader from "../components/SubpageHeader";
import ImageModal from "../components/ImageModal";
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
  const [modalMedia, setModalMedia] = useState(null);
  const [modalAlt, setModalAlt] = useState("");

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

  // Function to handle media clicks (images and videos)
  const handleMediaClick = (mediaSrc, mediaAlt) => {
    setModalMedia(mediaSrc);
    setModalAlt(mediaAlt);
  };

  // Function to close modal
  const closeModal = () => {
    setModalMedia(null);
    setModalAlt("");
  };

  // Custom components for ReactMarkdown to make images and videos clickable
  const components = {
    img: ({ src, alt, ...props }) => (
      <img
        {...props}
        src={src}
        alt={alt}
        className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
        onClick={() => handleMediaClick(src, alt)}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    ),
    video: ({ src, ...props }) => (
      <video
        {...props}
        src={src}
        className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
        onClick={() => handleMediaClick(src, "Video")}
        style={{ maxWidth: '100%', height: 'auto' }}
        controls
        preload="metadata"
      />
    ),
  };

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <div className="max-w-3xl mx-auto py-16 px-4">
        {meta.coverImage && (
          <img
            src={meta.coverImage}
            alt={meta.title}
            className="rounded-3xl mb-8 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            style={{ maxHeight: 320 }}
            onClick={() => handleMediaClick(meta.coverImage, meta.title)}
          />
        )}
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          {meta.title}
        </h1>

        <div className="text-left custom-markdown-style dark:prose-invert">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Media Modal */}
      <ImageModal
        media={modalMedia}
        alt={modalAlt}
        isOpen={!!modalMedia}
        onClose={closeModal}
      />
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
        <div>
          <CaseStudyPage file={file} />
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-neutral-800 dark:text-white bg-neutral-50 dark:bg-neutral-950">
        Case Study Not Found
      </div>
    );
  }
}
