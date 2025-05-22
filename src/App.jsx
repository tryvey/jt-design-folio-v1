import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import '@fontsource/inter';

const fetchMarkdown = async (path) => {
  const url = `${path}?t=${Date.now()}`;
  const res = await fetch(url);
  const text = await res.text();
  return text;
};

// Helper to parse case studies from markdown
function parseCaseStudies(md) {
  // Split by ---
  return md
    .split('---')
    .map((block) => {
      const titleMatch = block.match(/### (.+)/);
      const imgMatch = block.match(/!\[[^\]]*\]\(([^)]+)\)/);
      const descMatch = block.match(/\)\n([^\[]+)/);
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

function App() {
  const [hero, setHero] = useState('');
  const [about, setAbout] = useState('');
  const [caseStudies, setCaseStudies] = useState([]);
  const [links, setLinks] = useState('');

  useEffect(() => {
    const loadAll = async () => {
      const h = await fetchMarkdown('/content/hero.md');
      const a = await fetchMarkdown('/content/about.md');
      const c = await fetchMarkdown('/content/case-studies.md');
      const l = await fetchMarkdown('/content/links.md');
      setHero(h);
      setAbout(a);
      setCaseStudies(parseCaseStudies(c));
      setLinks(l);
    };
    loadAll();
    const interval = setInterval(loadAll, 1000);
    return () => clearInterval(interval);
  }, []);

  // Parse hero content
  const heroLines = hero.split('\n').filter(Boolean);
  const heroTitle = heroLines[0]?.replace(/^# /, '') || '';
  const heroSubtitle = heroLines[1] || '';
  const heroDesc = heroLines.slice(2, heroLines.length - 1).join(' ');
  const heroCtaMatch = hero.match(/\[(.+)\]\(([^)]+)\)/);
  const heroCta = heroCtaMatch ? { text: heroCtaMatch[1], href: heroCtaMatch[2] } : null;

  return (
    <div className="font-sans bg-neutral-950 text-white min-h-screen">
      {/* Hero Section with background image, overlay, centered content, and logo */}
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
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-12">
          {/* Logo */}
          <img src="/images/JT-logo.svg" alt="Logo" className="mb-10 w-48 md:w-56 lg:w-64 mx-auto" style={{ maxWidth: '260px' }} />
          {/* Title */}
          <div className="text-2xl md:text-3xl font-bold mb-8 text-white text-center drop-shadow-lg">{heroTitle}</div>
          {/* Subtitle (main headline) */}
          <div className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-4 text-center drop-shadow-lg" style={{ maxWidth: '40rem' }}>
            {heroSubtitle}
          </div>
          {/* Description (optional) */}
          {heroDesc && (
            <div className="text-lg md:text-xl text-white/90 mb-4 max-w-xl text-center drop-shadow-lg">{heroDesc}</div>
          )}
          {/* CTA (optional) */}
          {heroCta && (
            <a href={heroCta.href} className="inline-block bg-white text-neutral-950 rounded-full px-6 py-2 font-semibold shadow hover:bg-neutral-200 transition w-max mt-4">
              {heroCta.text}
            </a>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="w-full bg-neutral-950 text-white py-16 px-4 md:px-0 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="inline-block bg-neutral-800 text-white rounded-full px-4 py-1 text-xs font-semibold mb-4">About us</div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2">home improvement specialists</h2>
          </div>
          <div className="flex-1 prose prose-invert max-w-none">
            <ReactMarkdown>{about}</ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="w-full bg-neutral-950 py-16 px-4 md:px-0 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Best Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs, i) => (
            <div key={i} className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <img
                src={cs.image}
                alt={cs.title}
                className="w-full aspect-square object-cover bg-neutral-800"
                onError={e => (e.target.src = 'https://placehold.co/400x400?text=Case+Study')}
              />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-white">{cs.title}</h3>
                <p className="text-white/90 flex-1">{cs.desc}</p>
                <a href={cs.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-white/90 hover:text-white underline">View on Figma</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-white/90">
          <div className="prose prose-invert">
            <ReactMarkdown>{links}</ReactMarkdown>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
