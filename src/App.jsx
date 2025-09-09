import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import "@fontsource/inter";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkCaseStudyRoute from "./pages/WorkCaseStudyPage";
import ResumePage from "./pages/ResumePage";
import { getCaseStudiesFromFiles } from "./pages/HomePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import { trackPageView } from "./utils/analytics";

// ============================================================
// Page View Tracking Component
// ============================================================
function PageViewTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname);
  }, [location]);
  
  return null;
}

// ============================================================
// Main App Component
// ============================================================

function App() {
  // State for content from markdown files
  const [heroHeader, setHeroHeader] = useState("");
  const [heroContent, setHeroContent] = useState("");
  const [about, setAbout] = useState("");
  const [caseStudies, setCaseStudies] = useState([]);

  // Fetch content from markdown files
  useEffect(() => {
    const loadAll = async () => {
      const hh = await fetch("/content/hero-header.md?t=" + Date.now()).then(res => res.text());
      const hc = await fetch("/content/hero-content.md?t=" + Date.now()).then(res => res.text());
      const a = await fetch("/content/about.md?t=" + Date.now()).then(res => res.text());
      setHeroHeader(hh);
      setHeroContent(hc);
      setAbout(a);
      // Use fetchMarkdown and getCaseStudiesFromFiles from HomePage
      // Import getCaseStudiesFromFiles directly instead of dynamic import
      const studies = await getCaseStudiesFromFiles();
      setCaseStudies(studies);
    };
    loadAll();
    const interval = setInterval(loadAll, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <PageViewTracker />
        <Navigation />
        <div className="pt-24 sm:pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  heroHeader={heroHeader}
                  heroContent={heroContent}
                  about={about}
                  caseStudies={caseStudies}
                />
              }
            />
            <Route
              path="/work/:slug"
              element={<WorkCaseStudyRoute />}
            />
            <Route
              path="/resume"
              element={<ResumePage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
