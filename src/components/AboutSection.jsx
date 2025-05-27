import React from "react";
import ReactMarkdown from "react-markdown";

function AboutSection({ about }) {
  return (
    <section className="w-full bg-neutral-950 text-white py-16 px-4 md:px-0 mx-auto">
      <div className="flex flex-col max-w-3xl mx-auto">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{about}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
