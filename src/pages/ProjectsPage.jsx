import React from "react";
import SubpageHeader from "../components/SubpageHeader";

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <SubpageHeader scrollToTop={true} />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 pt-32">
        <div className="bg-transparent rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden">
          <div className="p-8 md:p-12 bg-gradient-to-r from-neutral-50/50 to-neutral-100/50 dark:from-neutral-800/50 dark:to-neutral-900/50">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-4">
                Projects
              </h1>
              <p className="text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                This section is currently in progress. I am actively working on it, and it will be available soon.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectsPage;
