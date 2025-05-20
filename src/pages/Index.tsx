import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import GsapProvider from '@/components/providers/GsapProvider';
import Preloader from '@/components/layout/Preloader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const siteMainRef = useRef<HTMLDivElement>(null);

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
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, [isLoading]);
  
  const handlePreloaderLoaded = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    // Using the updated Preloader with progress bar
    return <Preloader onLoaded={handlePreloaderLoaded} siteName="sic parvis magna" />;
  }

  return (
    <GsapProvider>
      <div 
        ref={siteMainRef} 
        className="site-main-content bg-bg-primary min-h-screen"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
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