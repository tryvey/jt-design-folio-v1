import React from "react";
import { getBrandColor } from "../utils.jsx";

function CaseStudiesGridSection({ caseStudies, onCaseStudyClick }) {
  return (
    <section
      id="projects"
      className="w-full bg-white dark:bg-neutral-900 py-16 px-4 md:px-0 mx-auto"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
          Case Studies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.slug}
              onClick={() => onCaseStudyClick(cs.slug)}
              className={`block transition-transform hover:scale-[1.02] text-left w-full bg-transparent border-0 p-0 m-0 ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <div
                className="rounded-3xl md:rounded-[2.0rem] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-800 shadow-lg dark:shadow-neutral-800/30 h-full"
                style={{ backgroundColor: getBrandColor(cs.title) }}
              >
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="max-w-full min-h-48 object-cover w-full"
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
