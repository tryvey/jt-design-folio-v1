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
          {/* Left Column - Image */}
          <div className="w-full h-full min-h-[280px] md:min-h-0">
            <div className="group relative w-full h-full overflow-hidden rounded-lg border border-neutral-300/60 dark:border-neutral-600/60 bg-neutral-200 dark:bg-neutral-700">
              <img
                src="/images/about-visionpro.png"
                alt="Jamie wearing Apple Vision Pro"
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
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
