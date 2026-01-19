import React from "react";
import { getBrandColor } from "../utils.jsx";

function CaseStudiesGridSection({ caseStudies, onCaseStudyClick }) {
  return (
    <section
      id="projects"
      className="w-full bg-transparent py-16 px-6 sm:px-8 lg:px-12 mx-auto"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-neutral-800 dark:text-neutral-100 text-center">
          Case Studies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.slug}
              onClick={() => onCaseStudyClick(cs.slug)}
              className={`block transition-all duration-300 hover:scale-[1.02] text-left w-full bg-transparent border-0 p-0 m-0 ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <div
                className="rounded-3xl md:rounded-[2.0rem] flex flex-col items-start justify-between overflow-hidden bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-xl h-full relative"
                style={{ 
                  backgroundColor: getBrandColor(cs.title),
                  border: '1px solid rgba(156, 163, 175, 0.3)',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(156, 163, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  minHeight: '100%',
                  width: '100%'
                }}
              >
                {/* Enhanced inner glow effect */}
                <div className="absolute inset-0 rounded-3xl md:rounded-[2.0rem] bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Additional glass highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-3xl" />
                
                <div className="flex-1 w-full">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="max-w-full w-full h-full object-cover relative z-10"
                  />
                </div>
                
                <div className="p-6 w-full bg-neutral-900/80 backdrop-blur-sm h-24 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white text-center">
                    {cs.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesGridSection;
