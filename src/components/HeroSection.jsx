import React from "react";

function HeroSection({ heroHeader, heroContent }) {
  // Parse hero header
  const headerLines = heroHeader.split("\n").filter(Boolean);
  const headerTitle = headerLines[0]?.replace(/^## /, "") || "";

  // Parse hero content
  const contentLines = heroContent.split("\n").filter(Boolean);

  // Handle smooth scrolling for anchor links
  const handleScrollTo = (e) => {
    e.preventDefault();
    const targetId = "projects";
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative w-full h-[85vh] md:h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: "url(/images/hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      <div className="absolute inset-0" aria-hidden="true"></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
            {headerTitle}
          </div>

          <div className="space-y-2 md:space-y-6 mb-6">
            {contentLines.map((line, index) => (
              <h1
                key={index}
                className="text-2xl md:text-2xl lg:text-4xl font-medium text-white drop-shadow-lg"
              >
                {line}
              </h1>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#projects"
            className="flex flex-col items-center text-white hover:text-white/80 transition-colors"
            onClick={handleScrollTo}
          >
            <img
              src="/scroll.svg"
              alt="Scroll down"
              className="h-8 w-8 mb-2 animate-bounce"
            />
            <span className="text-sm font-medium hidden">
              Scroll to explore
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
