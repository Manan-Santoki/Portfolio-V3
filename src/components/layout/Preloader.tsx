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
  const [displayText, setDisplayText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

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

  // Loading animation - only starts after typing is complete
  useEffect(() => {
    if (!typingComplete) return;
    
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
      delay: 0.5, // Short delay after typing completes
    });

    // Cursor blink effect after typing completes
    gsap.to('.typewriter-cursor', {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
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
  }, [onLoaded, typingComplete]);

  return (
    <div className="preloader-component" ref={preloaderRef}>
      <div className="site-name-preloader">
        <span ref={siteNameRef} className="typewriter-text">
          {displayText}<span className="typewriter-cursor">|</span>
        </span>
      </div>
      <div className={`preloader-gutters ${typingComplete ? 'show' : 'hide'}`}>
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