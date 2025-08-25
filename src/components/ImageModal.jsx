import React, { useEffect } from "react";

export default function ImageModal({ media, alt, isOpen, onClose }) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset"; // Restore scrolling
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine if the media is a video based on file extension
  const isVideo = media && /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(media);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
      onClick={onClose}
      style={{
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      
      {/* Modal content */}
      <div className="relative z-10 w-[95vw] max-h-[95vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-20 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Close media modal"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Media container */}
        <div className="relative">
          {isVideo ? (
            <video
              src={media}
              controls
              preload="metadata"
              playsInline
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
            >
              Your browser doesn't support video playback.
            </video>
          ) : (
            <img
              src={media}
              alt={alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          )}
        </div>
        
        {/* Media caption */}
        {alt && (
          <div className="mt-4 text-center">
            <p className="text-white text-lg font-medium">{alt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
