import React from "react";
import { getBrandColor } from "../utils.jsx";

function CaseStudiesGridSection({ caseStudies, onCaseStudyClick }) {
  return (
    <section
      id="projects"
      className="w-full bg-neutral-50 dark:bg-neutral-950 py-16 px-4 md:px-0 mx-auto"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[30px] font-bold mb-8 text-neutral-800 dark:text-neutral-100 text-center">
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
                className="rounded-3xl md:rounded-[2.0rem] flex flex-col items-center justify-center overflow-hidden bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-xl h-full relative"
                style={{ 
                  backgroundColor: getBrandColor(cs.title),
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
                
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="max-w-full min-h-48 object-cover w-full relative z-10"
                />
                <div className="p-6 w-full hidden">
                  <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-white">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {cs.desc}
                  </p>
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
