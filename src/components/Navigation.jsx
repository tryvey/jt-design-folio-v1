import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navigation() {
  const { theme, setTheme, getEffectiveTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isActive = (path) => {
    // Check for specific routes
    if (path === "/" && location.pathname === "/") return true;
    if (path === "/case-studies" && location.pathname.startsWith("/work")) return true;
    if (path === "/resume" && location.pathname === "/resume") return true;
    
    // Check for homepage sections
    if (path === "/about" && activeSection === "about") return true;
    if (path === "/case-studies" && activeSection === "projects") return true;
    if (path === "/contact" && activeSection === "contact") return true;
    
    return false;
  };

  // Track scroll position to highlight active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "contact"];
      const headerHeight = 80;
      
      // Check if we're on the homepage
      if (location.pathname !== "/") {
        setActiveSection("");
        return;
      }
      
      // Get current scroll position
      const scrollY = window.scrollY;
      
      // Debug: Log current scroll position
      console.log("Scroll Y:", scrollY);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.offsetTop - headerHeight;
          const elementBottom = elementTop + element.offsetHeight;
          
          // Debug: Log section positions
          console.log(`Section ${section}:`, { elementTop, elementBottom, scrollY });
          
          // Check if current scroll position is within this section
          if (scrollY >= elementTop - 100 && scrollY < elementBottom - 100) {
            if (activeSection !== section) {
              setActiveSection(section);
              console.log("Active section changed to:", section);
            }
            break;
          }
        } else {
          console.log(`Section ${section} element not found`);
        }
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Check initial position
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSectionElement(sectionId);
      }, 100);
    } else {
      // We're already on home page, scroll directly
      scrollToSectionElement(sectionId);
    }
  };

  const scrollToTop = () => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll to top
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 100);
    } else {
      // We're already on home page, scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const scrollToSectionElement = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Height of the navigation bar
      const elementTop = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Floating Navigation Container */}
        <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md rounded-full shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 px-6 py-2 pr-2 md:pr-4">
          <div className="flex items-center justify-between flex-1">
            {/* Logo/Brand or Back Button */}
            {location.pathname === "/" ? (
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-4 text-lg md:text-xl font-bold text-neutral-800 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-all duration-200 font-headline"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 border-2 border-neutral-300 dark:border-neutral-600 flex items-center justify-center">
                  <span className="text-neutral-400 dark:text-neutral-500 text-xs">JT</span>
                </div>
                Jamie Treyvaud
              </button>
            ) : (
              <button 
                onClick={() => {
                  navigate("/");
                  // Wait for navigation to complete, then scroll to projects section
                  setTimeout(() => {
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) {
                      const headerHeight = 80; // Account for floating nav height
                      const elementTop = projectsSection.offsetTop - headerHeight;
                      window.scrollTo({
                        top: elementTop,
                        behavior: "smooth"
                      });
                    }
                  }, 100);
                }}
                className="flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-all duration-200 px-3 py-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <span className="mr-2 text-lg">←</span> Back
              </button>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("about")}
                className={`text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                  isActive("about") 
                    ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={`text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                  isActive("case-studies") 
                    ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                Case Studies
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                  isActive("contact") 
                    ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                Contact
              </button>
            </div>

            {/* Resume, Theme Switcher and Mobile Menu */}
            <div className="flex items-center space-x-0.5 md:space-x-4">
              {/* Resume Button - Desktop Only */}
              <button
                onClick={() => window.location.href = "/resume"}
                className={`hidden md:block text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                  isActive("resume") 
                    ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                Resume
              </button>
              {/* Segmented Theme Control */}
              <div className="relative flex bg-neutral-100 dark:bg-neutral-800 rounded-full p-0.5 md:p-1">
                {/* Animated Background */}
                {(() => {
                  const effectiveTheme = getEffectiveTheme();
                  return (
                    <div 
                      className={`absolute top-0.5 bottom-0.5 md:top-1 md:bottom-1 w-10 h-10 bg-white dark:bg-neutral-900 rounded-full shadow-md border border-neutral-200 dark:border-neutral-700 transition-all duration-300 ease-in-out ${
                        effectiveTheme === 'light' ? 'left-0.5 md:left-1' : 'left-10.5 md:left-11'
                      }`}
                    />
                  );
                })()}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTheme('light');
                  }}
                  className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 touch-manipulation"
                  aria-label="Light mode"
                  title="Light mode"
                  type="button"
                >
                  {(() => {
                    const effectiveTheme = getEffectiveTheme();
                    return (
                      <svg className={`w-4 h-4 ${effectiveTheme === 'light' ? 'text-yellow-500' : 'text-neutral-400 dark:text-neutral-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    );
                  })()}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTheme('dark');
                  }}
                  className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 touch-manipulation"
                  aria-label="Dark mode"
                  title="Dark mode"
                  type="button"
                >
                  {(() => {
                    const effectiveTheme = getEffectiveTheme();
                    return (
                      <svg className={`w-4 h-4 ${effectiveTheme === 'dark' ? 'text-blue-400' : 'text-neutral-400 dark:text-neutral-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    );
                  })()}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu - Positioned below floating nav */}
      <div className={`md:hidden fixed top-28 left-6 right-6 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="p-4 space-y-2">
          {/* Back Button for Subpages */}
          {location.pathname !== "/" && (
            <button
              onClick={() => {
                navigate("/");
                // Wait for navigation to complete, then scroll to projects section
                setTimeout(() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    const headerHeight = 80; // Account for floating nav height
                    const elementTop = projectsSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementTop,
                      behavior: "smooth"
                    });
                  }
                }, 100);
                setIsMobileMenuOpen(false); // Close mobile menu
              }}
              className="block w-full text-left px-3 py-2 rounded-full text-sm font-medium transition-colors text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              ← Back to Case Studies
            </button>
          )}
          
          <button
            onClick={() => scrollToSection("about")}
            className={`block w-full text-left px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive("about") 
                ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className={`block w-full text-left px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive("case-studies") 
                ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => window.location.href = "/resume"}
            className={`block w-full text-left px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive("resume") 
                ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            Resume
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`block w-full text-left px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive("contact") 
                ? "text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}