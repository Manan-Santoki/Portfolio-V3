
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillPanel from '../ui/SkillPanel';

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  languages: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  frameworks: ["ReactJS", "NodeJS", "Express", "Next.js", "TensorFlow", "Keras", "LangChain", "PyTorch"],
  tools: ["Kubernetes", "Jenkins", "Docker", "GIT", "MySQL", "MongoDB", "AWS CLI", "Terraform"],
  platforms: ["AWS", "GCP", "Linux", "Windows", "Azure", "Heroku", "Netlify", "Vercel"]
};

interface SkillsContextType {
  activeSkill: string | null;
  setActiveSkill: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SkillsContext = React.createContext<SkillsContextType>({
  activeSkill: null,
  setActiveSkill: () => {}
});

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.7 }
    );
    
    if (panelsRef.current) {
      const panels = panelsRef.current.querySelectorAll('.skill-panel');
      tl.fromTo(panels, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 
        "-=0.3"
      );
    }
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <SkillsContext.Provider value={{ activeSkill, setActiveSkill }}>
      <section id="skills" ref={sectionRef} className="section bg-bg-primary">
        <div className="max-w-6xl mx-auto w-full">
          <h2 ref={titleRef} className="section-title">Skills</h2>
          
          <div className="mt-12">
            <p className="text-lg mb-8">
              My technical toolkit spans multiple domains, enabling me to tackle diverse challenges
              from web development to AI/ML implementation. Here's a breakdown of my skills:
            </p>
            
            <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <SkillPanel title="Languages" skills={skillsData.languages} />
              <SkillPanel title="Frameworks" skills={skillsData.frameworks} />
              <SkillPanel title="Tools" skills={skillsData.tools} />
              <SkillPanel title="Platforms" skills={skillsData.platforms} />
            </div>
            
            {activeSkill && (
              <div className="mt-8 p-4 border border-accent-primary bg-bg-primary bg-opacity-20 text-center">
                <p>
                  <span className="font-bold text-accent-primary">{activeSkill}</span> is highlighted. 
                  Scroll down to see related projects.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SkillsContext.Provider>
  );
};

export default SkillsSection;
