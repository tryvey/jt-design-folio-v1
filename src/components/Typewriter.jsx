import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const Typewriter = forwardRef(({ titles, speed = 100, delay = 2000 }, ref) => {
  const [currentText, setCurrentText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const animationRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const typeIntervalRef = useRef(null);
  const deleteIntervalRef = useRef(null);
  const delayTimeoutRef = useRef(null);
  const isInitializedRef = useRef(false);

  const clearAllTimers = () => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    if (deleteIntervalRef.current) clearInterval(deleteIntervalRef.current);
    if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
    typeIntervalRef.current = null;
    deleteIntervalRef.current = null;
    delayTimeoutRef.current = null;
  };

  const restartAnimation = () => {
    // Clear all existing timers
    clearAllTimers();
    
    // Reset state
    setCurrentText('');
    setCurrentTitleIndex(0);
    isAnimatingRef.current = false;
    isInitializedRef.current = false;
    
    // Start fresh animation
    setTimeout(() => {
      animate();
    }, 100);
  };

  const animate = () => {
    if (isAnimatingRef.current) return; // Prevent multiple animations
    isAnimatingRef.current = true;
    
    const currentTitle = titles[currentTitleIndex];
    let text = '';
    let charIndex = 0;

    // Type out the current title
    typeIntervalRef.current = setInterval(() => {
      if (charIndex < currentTitle.length) {
        text += currentTitle[charIndex];
        setCurrentText(text);
        charIndex++;
      } else {
        clearInterval(typeIntervalRef.current);
        
        // Wait for the specified delay
        delayTimeoutRef.current = setTimeout(() => {
          // Delete the text
          deleteIntervalRef.current = setInterval(() => {
            if (text.length > 0) {
              text = text.slice(0, -1);
              setCurrentText(text);
            } else {
              clearInterval(deleteIntervalRef.current);
              isAnimatingRef.current = false;
              
              // Move to next title (this will loop back to 0 when reaching the end)
              setCurrentTitleIndex(prev => (prev + 1) % titles.length);
            }
          }, speed / 2);
        }, delay);
      }
    }, speed);
  };

  // Expose restart function to parent component
  useImperativeHandle(ref, () => ({
    restart: restartAnimation
  }));

  // Initialize animation on mount and page refresh
  useEffect(() => {
    // Clear any existing state
    clearAllTimers();
    setCurrentText('');
    setCurrentTitleIndex(0);
    isAnimatingRef.current = false;
    isInitializedRef.current = false;
    
    // Start the animation after a brief delay to ensure clean state
    const initTimer = setTimeout(() => {
      animate();
      isInitializedRef.current = true;
    }, 200);

    return () => {
      clearTimeout(initTimer);
      clearAllTimers();
    };
  }, []); // Empty dependency array ensures this runs only on mount/refresh

  // Start new animation when title changes (including looping back to 0)
  useEffect(() => {
    if (isInitializedRef.current) { // Run for all title changes, including loop back to 0
      setCurrentText('');
      setTimeout(() => {
        animate();
      }, 200); // Slightly longer delay to ensure clean transition
    }
  }, [currentTitleIndex]);

  return (
    <div className="typewriter-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 dark:text-white drop-shadow-lg text-center w-full px-4 font-headline">
      {currentText}
      <span className="typewriter-cursor"></span>
    </div>
  );
});

export default Typewriter;


