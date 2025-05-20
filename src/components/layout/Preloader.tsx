import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '@/styles/Preloader.css';

interface PreloaderProps {
  onLoaded: () => void;
  siteName?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded, siteName = "Cosmic" }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderOverlayRef = useRef<HTMLDivElement>(null);
  const siteNameRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 150; // milliseconds per character
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= siteName.length) {
        setDisplayText(siteName.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [siteName]);

  // Progress bar animation - starts after typing is complete
  useEffect(() => {
    if (!typingComplete) return;
    
    let progressTimer: NodeJS.Timeout;
    
    // Animate progress from 0 to 100 over 2.5 seconds
    progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return newProgress;
      });
    }, 25); // 25ms * 100 steps = ~2.5 seconds
    
    return () => clearInterval(progressTimer);
  }, [typingComplete]);

  // Apply loading animation after progress reaches 100%
  useEffect(() => {
    if (progress !== 100) return;
    
    if (!preloaderRef.current || !preloaderOverlayRef.current || !siteNameRef.current) {
      console.warn("Preloader refs not ready. Skipping animation.");
      onLoaded();
      return;
    }

    const innerBars = gsap.utils.toArray<HTMLDivElement>(
      preloaderRef.current.querySelectorAll('.preloader-gutters .inner-bar')
    );

    if (innerBars.length === 0) {
      console.warn("No inner bars found for preloader. Skipping animation.");
      onLoaded();
      return;
    }

    const masterTimeline = gsap.timeline({
      delay: 0.5, // Short delay after progress completes
    });

    // Animate bars with a cascading effect
    innerBars.forEach((bar, index) => {
      const randomWidth = Math.floor(Math.random() * 70) + 30; // Random width between 30-100%
      masterTimeline
        .to(bar, {
          width: `${randomWidth}%`,
          duration: 0.3,
          ease: "power2.inOut",
        }, index * 0.1) // Stagger each bar
        .to(bar, {
          width: "100%",
          duration: 0.3,
          ease: "power3.out",
        }, ">-0.1"); // Slight overlap for smoother flow
    });

    // Slide out the overlay and fade out preloader
    masterTimeline.to(preloaderOverlayRef.current, {
      xPercent: 100,
      duration: 0.8,
      ease: "power3.inOut",
    }, ">+0.3");

    masterTimeline.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onLoaded();
      },
    }, "<+0.2");

    return () => {
      masterTimeline.kill();
    };
  }, [onLoaded, progress]);

  return (
    <div className="preloader-component" ref={preloaderRef}>
      <div className="site-name-preloader">
        <div className="preloader-content">
          <span ref={siteNameRef} className="typewriter-text">
            {displayText}<span className="typewriter-cursor">|</span>
          </span>
          
          {typingComplete && (
            <div className="progress-container">
              <div 
                ref={progressBarRef} 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              >
                <span className="progress-text">{progress}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`preloader-gutters ${typingComplete && progress === 100 ? 'show' : 'hide'}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="bar" key={index}>
            <div className="inner-bar"></div>
          </div>
        ))}
      </div>
      <div className="preloader-overlay" ref={preloaderOverlayRef}></div>
    </div>
  );
};

export default Preloader;