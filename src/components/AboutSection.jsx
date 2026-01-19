import React from "react";
import ReactMarkdown from "react-markdown";

function AboutSection({ about }) {
  return (
    <section 
      id="about" 
      className="w-full py-16 px-6 sm:px-8 lg:px-12 mx-auto bg-neutral-100/50 dark:bg-neutral-800/50" 
      style={{
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)'
      }}
    >
      <div className="flex flex-col max-w-6xl mx-auto">
        {/* Custom header that matches other sections */}
        <h2 className="text-2xl font-bold mb-8 text-neutral-800 dark:text-white text-center">
          About
        </h2>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch">
          {/* Left Column - Image Placeholder */}
          <div className="w-full h-full">
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600">
              <span className="text-neutral-400 dark:text-neutral-500 text-sm">Image Placeholder</span>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="md:col-span-2 prose prose-neutral dark:prose-invert max-w-none text-left" style={{ fontSize: '18px' }}>
            <ReactMarkdown>{about}</ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
