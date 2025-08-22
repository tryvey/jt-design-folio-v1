import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
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
      const headerHeight = 64;
      
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
      const headerHeight = 64; // Height of the navigation bar
      const elementTop = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <button 
            onClick={scrollToTop}
            className="text-xl md:text-[26px] font-bold text-neutral-800 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-all duration-200 hover:border-b-2 hover:border-neutral-800 dark:hover:border-white font-headline"
          >
            Jamie Treyvaud
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:font-bold transition-all duration-200 hover:border-b-2 hover:border-neutral-800 dark:hover:border-white"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:font-bold transition-all duration-200 hover:border-b-2 hover:border-neutral-800 dark:hover:border-white"
            >
              Case Studies
            </button>
            <button
              onClick={() => window.location.href = "/resume"}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:font-bold transition-all duration-200 hover:border-b-2 hover:border-neutral-800 dark:hover:border-white"
            >
              Resume
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:font-bold transition-all duration-200 hover:border-b-2 hover:border-neutral-800 dark:hover:border-white"
            >
              Contact
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Case Studies
              </button>
              <button
                onClick={() => window.location.href = "/resume"}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Resume
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
