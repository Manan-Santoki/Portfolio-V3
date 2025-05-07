import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap'; // Import GSAP here as well for site content animation
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import GsapProvider from '@/components/providers/GsapProvider';
import Preloader from '@/components/layout/Preloader'; // Import the Preloader

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const siteMainRef = useRef<HTMLDivElement>(null); // Ref for the main content wrapper

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Animation for site content after preloader is done
  useEffect(() => {
    if (!isLoading && siteMainRef.current) {
      gsap.to(siteMainRef.current, {
        opacity: 1,
        y: 0,
        duration: 1, // Slightly longer for a dramatic reveal
        ease: "power3.out", // Smoother easing
        delay: 0.2, // Small delay for overlap with preloader exit
      });
    }
  }, [isLoading]);
  
  const handlePreloaderLoaded = () => {
    // console.log("Preloader finished, setting isLoading to false.");
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onLoaded={handlePreloaderLoaded} siteName="Parsing..." />; // Or your desired site name
  }

  return (
    <GsapProvider>
      {/* site-main-content class and ref for GSAP animation */}
      <div 
        ref={siteMainRef} 
        className="site-main-content bg-bg-primary min-h-screen"
        style={{ opacity: 0, transform: 'translateY(20px)' }} // Initial state for GSAP
      >
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </main>
      </div>
    </GsapProvider>
  );
};

export default Index;