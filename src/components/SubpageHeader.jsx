import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "../utils.jsx";

export default function SubpageHeader() {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate("/");
    // Use setTimeout to ensure navigation completes before scrolling
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
  };
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-center h-16 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm border-b border-neutral-200 dark:border-neutral-800"
      style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
    >
      <div className="grid grid-cols-3 items-center w-full max-w-4xl px-4">
        {/* Left: Back button */}
        <div className="flex items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center text-neutral-700 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full px-4 py-1 transition-colors text-sm font-medium"
          >
            <span className="mr-2 text-xl">←</span> Back
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center">
          <a href="/" className="flex items-center">
            <span className="inline-flex items-center justify-center  rounded-full p-1">
              <img
                src="/images/JT-logo.svg"
                alt="JT Logo"
                className="h-6 p-1 invert dark:invert-0"
                style={{ display: "inline-block" }}
              />
            </span>
          </a>
        </div>

        {/* Right: Theme Switcher */}
        <div className="flex items-center justify-end">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
