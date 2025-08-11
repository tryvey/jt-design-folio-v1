import React from "react";
import ReactMarkdown from "react-markdown";

function AboutSection({ about }) {
  return (
    <section id="about" className="w-full bg-neutral-100 dark:bg-neutral-800 py-16 px-6 md:px-0 mx-auto">
      <div className="flex flex-col max-w-3xl mx-auto">
        {/* Custom header that matches other sections */}
        <h2 className="text-[30px] font-bold mb-8 text-neutral-800 dark:text-white text-center">
          About
        </h2>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none text-left" style={{ fontSize: '18px' }}>
          <ReactMarkdown>{about}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
