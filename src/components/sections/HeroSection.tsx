
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  
  const titles = [
    "Full-Stack Developer",
    "DevOps Engineer",
    "AI/ML Practitioner"
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Setup GSAP animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial animations
    tl.fromTo(nameRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(titleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }, 
      "-=0.5"
    )
    .fromTo(descRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      "-=0.7"
    )
    .fromTo(btnRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      "-=0.7"
    );
    
    // Rotating titles animation
    let currentIndex = 0;
    const titleSpans = titleRef.current?.querySelectorAll('span');
    
    if (titleSpans && titleSpans.length > 0) {
      gsap.set(titleSpans, { display: 'none', opacity: 0, y: 20 });
      gsap.set(titleSpans[0], { display: 'inline-block' });
      
      gsap.to(titleSpans[0], { opacity: 1, y: 0, duration: 0.5 });
      
      const rotateTitles = () => {
        const current = currentIndex;
        currentIndex = (currentIndex + 1) % titles.length;
        
        gsap.to(titleSpans[current], { 
          opacity: 0, 
          y: -20, 
          duration: 0.5,
          onComplete: () => {
            gsap.set(titleSpans[current], { display: 'none' });
            gsap.set(titleSpans[currentIndex], { display: 'inline-block', y: 20 });
            gsap.to(titleSpans[currentIndex], { opacity: 1, y: 0, duration: 0.5 });
          } 
        });
      };
      
      const titleInterval = setInterval(rotateTitles, 3000);
      return () => clearInterval(titleInterval);
    }
  }, []);
  
  const scrollToNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="section bg-bg-primary relative min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-5xl mx-auto z-10">
        <div className="flex flex-col gap-4">
          <h1 
            ref={nameRef} 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-text-primary"
          >
            Manan <span className="text-accent-primary">Santoki</span>
          </h1>
          
          <div ref={titleRef} className="h-10 md:h-12">
            {titles.map((title, index) => (
              <span 
                key={index} 
                className="text-xl md:text-3xl font-medium text-text-secondary"
              >
                {title}
              </span>
            ))}
          </div>
          
          <p 
            ref={descRef} 
            className="text-lg md:text-xl text-text-secondary mt-4 max-w-2xl"
          >
            Building scalable web solutions, robust infrastructure, and intelligent AI systems.
          </p>
          
          <div className="mt-8">
            <a 
              ref={btnRef}
              href="#projects" 
              className="inline-block border-2 border-accent-primary text-accent-primary px-6 py-3 font-semibold text-lg hover:bg-accent-primary hover:text-bg-primary transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore My Work
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-accent-primary"
        onClick={scrollToNext}
        aria-label="Scroll to About section"
      >
        <ArrowDown size={32} />
      </a>
      
      {/* Background grid effect */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none">
        {Array(24).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="border-border-primary opacity-10"
            style={{ 
              border: '0.5px solid',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
