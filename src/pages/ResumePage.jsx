import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import SubpageHeader from "../components/SubpageHeader";
import Button from "../components/ui/Button";

function ResumePage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleDownloadResume = () => {
    // Create a link element to trigger download
    const link = document.createElement("a");
    link.href = "/images/Jamie-Treyvaud-Resume.pdf";
    link.download = "Jamie-Treyvaud-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Use SubpageHeader with scrollToTop for Resume page */}
      <SubpageHeader scrollToTop={true} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Resume Display */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          {/* Resume Image */}
          <div className="w-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center p-8">
            <img
              src="/images/Jamie-Treyvaud-Resume.png/Jamie-Treyvaud-Resume1page.png"
              alt="Jamie Treyvaud Resume"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Download Section */}
          <div className="p-8 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Download Resume
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Get a copy of my resume in PDF format for your records.
              </p>
              
              {/* Download Button */}
              <Button
                onClick={handleDownloadResume}
                size="large"
                className="inline-flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            For the most up-to-date information, please contact me directly.
          </p>
        </div>
      </main>
    </div>
  );
}

export default ResumePage;
