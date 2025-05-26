import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import '@fontsource/inter';

// ============================================================
// Helper Functions
// ============================================================

const fetchMarkdown = async (path) => {
  const url = `${path}?t=${Date.now()}`;
  const res = await fetch(url);
  const text = await res.text();
  return text;
};

// Helper to parse case studies from markdown
function parseCaseStudies(md) {
  return md
    .split('---')
    .map((block) => {
      const titleMatch = block.match(/### (.+)/);
      const imgMatch = block.match(/!\[[^\]]*\]\(([^)]+)\)/);
      const descMatch = block.match(/\)\n([^[]+)/);
      const linkMatch = block.match(/\[View on Figma\]\(([^)]+)\)/);

      return titleMatch && imgMatch && descMatch && linkMatch
        ? {
          title: titleMatch[1].trim(),
          image: imgMatch[1].trim(),
          desc: descMatch[1].trim(),
          link: linkMatch[1].trim(),
        }
        : null;
    })
    .filter(Boolean);
}

// ============================================================
// Component: HeroSection
// ============================================================

function HeroSection({ heroHeader, heroContent }) {
  // Parse hero header
  const headerLines = heroHeader.split('\n').filter(Boolean);
  const headerTitle = headerLines[0]?.replace(/^## /, '') || '';

  // Parse hero content
  const contentLines = heroContent.split('\n').filter(Boolean);
  const heroTitle = contentLines[0]?.replace(/^## /, '') || '';
  const heroSubtitle = contentLines[1] || '';
  const heroDesc = contentLines.slice(2, contentLines.length - 1).join(' ');
  const heroCtaMatch = heroContent.match(/\[(.+)\]\(([^)]+)\)/);
  const heroCta = heroCtaMatch ? { text: heroCtaMatch[1], href: '#projects' } : null;

  // Handle smooth scrolling for anchor links
  const handleScrollTo = (e) => {
    // Only apply to internal anchor links
    if (heroCta?.href.startsWith('#')) {
      e.preventDefault();
      const targetId = heroCta.href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(/images/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true"></div>

      {/* Content - Three Row Layout */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-4 py-12">

        {/* Top Row - Logo */}
        <div className="flex justify-center items-center pt-8">
          <img
            src="/images/JT-logo.svg"
            alt="Logo"
            className="w-48 md:w-56 lg:w-64"
            style={{ maxWidth: '260px' }}
          />
        </div>

        {/* Middle Row - Content */}
        <div className="flex flex-col items-center justify-center text-center my-8">
          {/* Header Title */}
          <div className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
            {headerTitle}
          </div>

          {/* Subtitle (main headline) */}
          <div
            className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-4 drop-shadow-lg"
            style={{ maxWidth: '40rem' }}
          >
            {heroTitle}
          </div>

          {/* Secondary subtitle */}
          <div className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
            {heroSubtitle}
          </div>

          {/* Description (optional) */}
          {heroDesc && (
            <div className="text-lg md:text-xl text-white/90 mb-4 max-w-xl drop-shadow-lg">
              {heroDesc}
            </div>
          )}
        </div>

        {/* Bottom Row - Scroll Anchor */}
        <div className="flex justify-center items-center pb-8">
          {/* CTA (scroll.svg as anchor link) */}
          {heroCta && (
            <a
              href={heroCta.href}
              onClick={handleScrollTo}
              className="inline-block animate-bounce"
              aria-label={heroCta.text}
            >
              <img
                src="/scroll.svg"
                alt={heroCta.text}
                className="w-10 h-10"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Component: AboutSection
// ============================================================

function AboutSection({ about }) {
  return (
    <section className="w-full bg-neutral-950 text-white py-16 px-4 md:px-0 max-w-6xl mx-auto">
      <div className="flex flex-col">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{about}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Component: CaseStudiesSection
// ============================================================

function CaseStudiesSection({ caseStudies }) {
  return (
    <section id="projects" className="w-full bg-white py-16 px-4 md:px-0 mx-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-800">Case Studies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <a
              key={i}
              href={cs.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block transition-transform hover:scale-[1.02] ${i === 0 ? 'sm:col-span-2' : ''}`}
            >
              <div
                className="rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: getBrandColor(cs.title)
                }}
              >
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="max-w-full max-h-full object-cover"
                  style={{
                    filter: cs.title.toLowerCase().includes('vision') ? 'none' : 'none',
                    maxHeight: '45%'
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to determine brand colors based on case study title
function getBrandColor(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('open universities')) return '#4052B5';
  if (lowerTitle.includes('marvel stadium')) return '#4D2230';
  if (lowerTitle.includes('xero')) return '#13B5EA';
  if (lowerTitle.includes('post') || lowerTitle.includes('australia post')) return '#000000';
  if (lowerTitle.includes('vision') || lowerTitle.includes('apple')) return '#000000';
  // Default color for other brands
  return '#333333';
}

// ============================================================
// Component: Footer
// ============================================================

function Footer({ name, footerLinks, copyrightText }) {
  return (
    <footer id="contact" className="bg-neutral-950 py-12 mt-12 scroll-mt-8 target:ring-2 target:ring-blue-500/50 text-white/90 text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Name */}
        <div className="text-xl font-bold mb-4">{name}</div>

        {/* Links */}
        <div className="mb-4">
          {footerLinks && footerLinks.map((link, index) => (
            <>
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.text}
              </a>
              {index < footerLinks.length - 1 && <span className="mx-2">•</span>}
            </>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-sm">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// Main App Component
// ============================================================

function App() {
  // State for content from markdown files
  const [heroHeader, setHeroHeader] = useState('');
  const [heroContent, setHeroContent] = useState('');
  const [about, setAbout] = useState('');
  const [caseStudies, setCaseStudies] = useState([]);

  // Add new state for footer content
  const [footerLinks, setFooterLinks] = useState([]);

  // Fetch content from markdown files
  useEffect(() => {
    const loadAll = async () => {
      const hh = await fetchMarkdown('/content/hero-header.md');
      const hc = await fetchMarkdown('/content/hero-content.md');
      const a = await fetchMarkdown('/content/about.md');
      const c = await fetchMarkdown('/content/case-studies.md');
      const l = await fetchMarkdown('/content/links.md');

      setHeroHeader(hh);
      setHeroContent(hc);
      setAbout(a);
      setCaseStudies(parseCaseStudies(c));

      // Parse links from markdown for the new footer structure
      const linkRegex = /-\s*\[(.+)\]\(([^)]+)\)/g;
      const parsedLinks = [];
      let match;
      while ((match = linkRegex.exec(l)) !== null) {
        parsedLinks.push({
          text: match[1].trim(),
          href: match[2].trim(),
        });
      }
      setFooterLinks(parsedLinks);
    };

    loadAll();

    // Set up live reload
    const interval = setInterval(loadAll, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans bg-neutral-950 text-white min-h-screen">

      <HeroSection heroHeader={heroHeader} heroContent={heroContent} />
      <AboutSection about={about} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <Footer name="Jamie Treyvaud" footerLinks={footerLinks} copyrightText="© 2025 Copyrights. All rights reserved." />
    </div>
  );
}

export default App;
