import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import WorkCaseStudyPage from "../WorkCaseStudyPage";
import SubpageHeader from "../components/SubpageHeader";

// Mapping from slug to file path for case studies
export const caseStudyFiles = {
  "open-universities-australia": "/content/case-studies/open-universities-australia.md",
  "marvel-stadium": "/content/case-studies/marvel-stadium.md",
  "australia-post": "/content/case-studies/australia-post.md",
  "xero": "/content/case-studies/xero.md",
  "apple-vision-pro": "/content/case-studies/apple-vision-pro.md",
};

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
          <WorkCaseStudyPage file={file} />
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
