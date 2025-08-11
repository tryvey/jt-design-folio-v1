import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightText = `Copyright © ${currentYear}. All rights reserved.`;

  return (
    <footer className="bg-white dark:bg-black py-10 text-neutral-700 dark:text-white/90 text-center">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center space-y-6">
        {/* Logo - same styling as header navigation */}
        <div className="flex justify-center items-center">
          <a href="/" className="text-xl font-bold text-neutral-800 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
            Jamie Treyvaud
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-sm text-neutral-600 dark:text-white/70">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
}
