import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import CaseStudiesSection from "../components/CaseStudiesSection";
import Footer from "../components/Footer";
import { parseFrontmatter } from "../utils";

// Helper: fetch markdown
export const fetchMarkdown = async (path) => {
  const url = `${path}?t=${Date.now()}`;
  const res = await fetch(url);
  const text = await res.text();
  return text;
};

// Helper: get case studies from files
export async function getCaseStudiesFromFiles() {
  const files = [
    { slug: "open-universities-australia", file: "/content/case-studies/open-universities-australia.md" },
    { slug: "marvel-stadium", file: "/content/case-studies/marvel-stadium.md" },
    { slug: "australia-post", file: "/content/case-studies/australia-post.md" },
    { slug: "xero", file: "/content/case-studies/xero.md" },
    { slug: "apple-vision-pro", file: "/content/case-studies/apple-vision-pro.md" },
  ];
  const studies = await Promise.all(
    files.map(async ({ slug, file }) => {
      const text = await fetchMarkdown(file);
      const { meta, body } = (await import("../utils")).parseFrontmatter(text);
      return {
        slug,
        title: meta.title || "",
        image: meta.coverImage || "",
        desc: meta.excerpt || "",
        link: `/case-study/${slug}`,
        figma: meta.link || "",
        meta,
        body,
      };
    })
  );
  return studies;
}

export const caseStudyFiles = {
  "open-universities-australia": "/content/case-studies/open-universities-australia.md",
  "marvel-stadium": "/content/case-studies/marvel-stadium.md",
  "australia-post": "/content/case-studies/australia-post.md",
  "xero": "/content/case-studies/xero.md",
  "apple-vision-pro": "/content/case-studies/apple-vision-pro.md",
};

export default function HomePage({ heroHeader, heroContent, about, caseStudies }) {
  const navigate = useNavigate();
  const handleCaseStudyClick = (slug) => {
    navigate(`/work/${slug}`);
  };
  return (
    <>
      <HeroSection heroHeader={heroHeader} heroContent={heroContent} />
      <AboutSection about={about} />
      <CaseStudiesSection
        caseStudies={caseStudies}
        onCaseStudyClick={handleCaseStudyClick}
      />
      <Footer />
    </>
  );
}
