import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button.jsx";

export default function SubpageHeader({ scrollToTop = false }) {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate("/");
    
    if (scrollToTop) {
      // Scroll to top of home page
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 100);
    } else {
      // Use setTimeout to ensure navigation completes before scrolling to projects section
      setTimeout(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          // Scroll to the section with some offset to account for the fixed header
          const headerHeight = 64; // 16 * 4 = 64px (h-16)
          const elementTop = projectsSection.offsetTop - headerHeight;
          window.scrollTo({
            top: elementTop,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  return (
    <header
      className="fixed top-16 left-0 w-full z-40 flex items-center justify-center h-16 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm"
      style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center justify-center w-full max-w-4xl px-4">
        {/* Back button */}
        <Button
          onClick={handleBackClick}
          className="text-neutral-700 dark:text-neutral-200"
        >
          <span className="mr-2 text-xl">←</span> Back
        </Button>
      </div>
    </header>
  );
}
