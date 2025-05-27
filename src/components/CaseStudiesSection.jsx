import React from "react";
import { getBrandColor } from "../utils";

function CaseStudiesSection({ caseStudies, onCaseStudyClick }) {
  return (
    <section
      id="projects"
      className="w-full bg-white py-16 px-4 md:px-0 mx-auto"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-800">
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
                className="rounded-3xl md:rounded-[2.0rem] flex flex-col items-center justify-center overflow-hidden bg-white shadow-lg h-full"
                style={{ backgroundColor: getBrandColor(cs.title) }}
              >
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="max-w-full min-h-48  object-cover w-full"
                  style={{
                    filter: cs.title.toLowerCase().includes("vision")
                      ? "none"
                      : "none",
                  }}
                />
                <div className="p-4 w-full hidden">
                  <div className="font-bold text-lg text-neutral-900 mb-1">
                    {cs.title}
                  </div>
                  <div className="text-neutral-700 text-base mb-2">
                    {cs.desc}
                  </div>
                  {cs.figma && (
                    <a
                      href={cs.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View on Figma
                    </a>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
