
import React, { createContext, useEffect, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface GsapContextProps {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

const GsapContext = createContext<GsapContextProps>({ gsap, ScrollTrigger });

export const useGsap = () => useContext(GsapContext);

interface GsapProviderProps {
  children: React.ReactNode;
}

export const GsapProvider: React.FC<GsapProviderProps> = ({ children }) => {
  useEffect(() => {
    // Enable GSAP debug mode in development
    if (process.env.NODE_ENV === 'development') {
      window.gsap = gsap;
      ScrollTrigger.config({ 
        autoRefreshEvents: 'DOMContentLoaded,load,resize',
      });
    }
    
    // Clean up all ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return (
    <GsapContext.Provider value={{ gsap, ScrollTrigger }}>
      {children}
    </GsapContext.Provider>
  );
};

export default GsapProvider;
