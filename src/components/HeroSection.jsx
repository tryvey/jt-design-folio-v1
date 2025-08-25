import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Typewriter from "./Typewriter";

function HeroSection({ heroHeader, heroContent }) {
  // Parse hero header
  const headerLines = heroHeader.split("\n").filter(Boolean);
  const headerTitle = headerLines[0]?.replace(/^## /, "") || "";

  // Parse hero content
  const contentLines = heroContent.split("\n").filter(Boolean);

  // Job titles for typewriter animation
  const jobTitles = [
    "Product Design Lead",
    "Design Systems Specialist",
    "AI & Vibe Coding Explorer",
    "Experience Design Leader",
    "Plant Whisperer"
  ];

  // Ref for the Typewriter component
  const typewriterRef = useRef(null);

  // Handle smooth scrolling for anchor links
  const handleScrollTo = (e) => {
    e.preventDefault();
    const targetId = "projects";
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll detection to restart animation
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          // Check if user has scrolled back to the top (within 100px)
          if (lastScrollY < 100) {
            // Restart the typewriter animation
            if (typewriterRef.current && typewriterRef.current.restart) {
              typewriterRef.current.restart();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ensure animation restarts on page entry/refresh
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      if (typewriterRef.current && typewriterRef.current.restart) {
        typewriterRef.current.restart();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);



  return (
    <section className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Main Content Container - Positioned to avoid image overlap */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
        
        {/* Content Wrapper - Constrained to upper portion of hero to avoid image overlap */}
        <div className="w-full max-w-4xl flex flex-col items-center justify-center" style={{ maxHeight: '70%' }}>
          {/* Header Title */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight">
              {headerTitle}
            </h1>
          </div>

          {/* Typewriter Animation */}
          <div className="mb-6 sm:mb-8 md:mb-12 w-full">
            <Typewriter 
              ref={typewriterRef}
              titles={jobTitles}
              speed={100}
              delay={2000}
            />
          </div>

          {/* Hero Content */}
          <div className="mb-8 sm:mb-12 md:mb-16 w-full">
            <div className="prose prose-base sm:prose-lg dark:prose-invert text-center mx-auto">
              <ReactMarkdown>
                {heroContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-auto mb-4 sm:mb-6 md:mb-8">
          <a
            href="#projects"
            className="flex flex-col items-center text-neutral-800 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
            onClick={handleScrollTo}
          >
            <svg
              className="h-8 w-8 mb-2 animate-bounce text-current"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Scroll to explore
            </span>
          </a>
        </div>
      </div>

      {/* Person Image - Bottom Center - Ensured to not overlap with text */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
        <img
          src="/images/JamieTBW.png"
          alt="Jamie Treyvaud"
          className="h-[80%] md:h-[70%] lg:h-[70%] w-[130vw] md:w-[65vw] lg:w-[65vw] max-w-[130vw] md:max-w-[65vw] lg:max-w-[65vw] min-w-[400px] object-contain opacity-90 dark:opacity-80 grayscale"
          style={{
            width: window.innerWidth > 1024 ? '600px' : undefined,
            maxWidth: window.innerWidth > 1024 ? '600px' : undefined
          }}

        />
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-neutral-900 to-transparent"></div>
    </section>
  );
}

export default HeroSection;
