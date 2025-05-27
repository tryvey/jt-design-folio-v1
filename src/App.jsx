import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import "@fontsource/inter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkCaseStudyRoute from "./pages/WorkCaseStudyPage";
import { getCaseStudiesFromFiles } from "./pages/HomePage";

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
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
