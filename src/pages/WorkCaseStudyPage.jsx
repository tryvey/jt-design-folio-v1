import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Footer from "../components/Footer";
import SubpageHeader from "../components/SubpageHeader";
import ImageModal from "../components/ImageModal";
import { parseFrontmatter } from "../utils.jsx";
import { trackCaseStudyView } from "../utils/analytics.js";

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
      
      // Track case study view
      if (meta.title) {
        trackCaseStudyView(meta.title);
      }
    }
    fetchCaseStudy();
  }, [file]);

  // Function to handle media clicks (images and videos)
  const handleMediaClick = (mediaSrc, mediaAlt) => {
    setModalMedia(mediaSrc);
    setModalAlt(mediaAlt);
  };

  // Marvel images array for navigation (Marvel2, Marvel3, Marvel4, and Marvel5)
  const marvelImages = [
    {
      src: "/images/case-studies/marvelstadium/Marvel2.png",
      alt: "Events Overview"
    },
    {
      src: "/images/case-studies/marvelstadium/Marvel3.png",
      alt: "Parking Confirmation"
    },
    {
      src: "/images/case-studies/marvelstadium/Marvel4.png",
      alt: "Food & Beverage Outlets"
    },
    {
      src: "/images/case-studies/marvelstadium/Marvel5.png",
      alt: "Fan Cam"
    }
  ];

  // Function to handle Marvel image clicks with navigation
  const handleMarvelImageClick = (index) => {
    setModalMedia(marvelImages[index].src);
    setModalAlt(marvelImages[index].alt);
  };

  // Function to check if current modal image is part of the Marvel navigation set
  const isMarvelNavigationImage = (mediaSrc) => {
    return marvelImages.some(img => img.src === mediaSrc);
  };

  // Function to close modal
  const closeModal = () => {
    setModalMedia(null);
    setModalAlt("");
  };

  // Custom components for ReactMarkdown to make images and videos clickable
  const components = {
    img: ({ src, alt, ...props }) => {
      // Check if this is Marvel2, Marvel3, Marvel4, or Marvel5 to apply special styling
      const isMarvelImage = src && (src.includes('Marvel2.png') || src.includes('Marvel3.png') || src.includes('Marvel4.png') || src.includes('Marvel5.png'));
      
      // Check if this is OU-CourseCard.png to remove shadow
      const isOUCourseCard = src && src.includes('OU-CourseCard.png');
      
      if (isMarvelImage) {
        return (
          <div className="marvel-image-group">
            <img
              {...props}
              src={src}
              alt={alt}
              className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
              onClick={() => handleMediaClick(src, alt)}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        );
      }
      
      // Apply different styling for OU-CourseCard (no shadow)
      const imageClasses = isOUCourseCard 
        ? "cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
        : "cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md";
      
      return (
        <img
          {...props}
          src={src}
          alt={alt}
          className={imageClasses}
          onClick={() => handleMediaClick(src, alt)}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    },
    em: ({ children, ...props }) => {
      // Check if this caption follows a Marvel image
      const previousElement = props.node?.previousSibling;
      const isMarvelCaption = previousElement && 
        previousElement.tagName === 'div' && 
        previousElement.className === 'marvel-image-group';
      
      if (isMarvelCaption) {
        return (
          <em className="marvel-caption" {...props}>
            {children}
          </em>
        );
      }
      
      return <em {...props}>{children}</em>;
    },
    h3: ({ children, ...props }) => {
      // Check if this is the "Final Design" heading AND we're viewing the Marvel Stadium case study
      if (children === "Final Design" && file.includes("marvel-stadium")) {
        return (
          <>
            <h3 {...props}>{children}</h3>
            <hr className="my-4" />
            <br />
            {/* Insert Marvel images after horizontal rule */}
            <div className="marvel-images-horizontal">
              <div className="marvel-image-item">
                <img
                  src="/images/case-studies/marvelstadium/Marvel2.png"
                  alt="Events Overview"
                  className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
                  onClick={() => handleMarvelImageClick(0)}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <em style={{ margin: 0, padding: 0, marginTop: 0, marginBottom: 0 }}>Events Overview</em>
              </div>
              <div className="marvel-image-item">
                <img
                  src="/images/case-studies/marvelstadium/Marvel3.png"
                  alt="Parking Confirmation"
                  className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
                  onClick={() => handleMarvelImageClick(1)}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <em style={{ margin: 0, padding: 0, marginTop: 0, marginBottom: 0 }}>Parking Confirmation</em>
              </div>
              <div className="marvel-image-item">
                <img
                  src="/images/case-studies/marvelstadium/Marvel4.png"
                  alt="Food & Beverage Outlets"
                  className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
                  onClick={() => handleMarvelImageClick(2)}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <em style={{ margin: 0, padding: 0, marginTop: 0, marginBottom: 0 }}>Food & Beverage Outlets</em>
              </div>
              <div className="marvel-image-item">
                <img
                  src="/images/case-studies/marvelstadium/Marvel5.png"
                  alt="Fan Cam"
                  className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
                  onClick={() => handleMarvelImageClick(3)}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <em style={{ margin: 0, padding: 0, marginTop: 0, marginBottom: 0 }}>Fan Cam</em>
              </div>
            </div>
          </>
        );
      }
      
      return <h3 {...props}>{children}</h3>;
    },
    video: ({ src, ...props }) => (
      <video
        {...props}
        src={src}
        className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-md"
        onClick={() => handleMediaClick(src, "Video")}
        style={{ maxWidth: '100%', height: 'auto' }}
        controls
        preload="metadata"
        playsInline
      >
        Your browser doesn't support video playback.
      </video>
    ),
  };

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <div className="max-w-6xl mx-auto py-16 px-4">
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
