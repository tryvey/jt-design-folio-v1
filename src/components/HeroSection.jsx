import React from "react";

function HeroSection({ heroHeader, heroContent }) {
  // Parse hero header
  const headerLines = heroHeader.split("\n").filter(Boolean);
  const headerTitle = headerLines[0]?.replace(/^## /, "") || "";

  // Parse hero content
  const contentLines = heroContent.split("\n").filter(Boolean);
  const heroTitle = contentLines[0]?.replace(/^## /, "") || "";
  const heroSubtitle = contentLines[1] || "";
  const heroDesc = contentLines.slice(2, contentLines.length - 1).join(" ");
  const heroCtaMatch = heroContent.match(/\[(.+)\]\(([^)]+)\)/);
  const heroCta = heroCtaMatch
    ? { text: heroCtaMatch[1], href: "#projects" }
    : null;

  // Handle smooth scrolling for anchor links
  const handleScrollTo = (e) => {
    if (heroCta?.href.startsWith("#")) {
      e.preventDefault();
      const targetId = heroCta.href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/images/hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" aria-hidden="true"></div>
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-4 py-12">
        <div className="flex justify-center items-center pt-8">
          <img
            src="/images/JT-logo.svg"
            alt="Logo"
            className="w-48 md:w-56 lg:w-64"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-center my-8">
          <div className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
            {headerTitle}
          </div>
          <div
            className="text-2xl md:text-3xl font-bold leading-tight text-white mb-4 drop-shadow-lg"
            style={{ maxWidth: "40rem" }}
          >
            {heroTitle}
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
            {heroSubtitle}
          </div>
          {heroDesc && (
            <div className="text-2xl md:text-3xl font-bold text-white/90 mb-4 max-w-xl drop-shadow-lg">
              {heroDesc}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center pb-8">
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
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
