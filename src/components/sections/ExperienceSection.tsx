
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp, Calendar, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
}

const experienceData: Experience[] = [
  {
    id: 'balkrushna',
    company: 'Balkrushna Technologies',
    position: 'DevOps & AI Engineer Intern',
    period: 'May 2023 - July 2023',
    description: [
      'Implemented CI/CD pipelines using Jenkins and Docker, reducing deployment time by 30%.',
      'Developed an AI Chatbot using LangChain and integrated it with company's knowledge base.',
      'Configured and managed Kubernetes clusters for microservices architecture.'
    ]
  },
  {
    id: 'jalaram',
    company: 'Jalaram Wiremesh Co.',
    position: 'Software Developer Intern',
    period: 'Dec 2022 - Apr 2023',
    description: [
      'Designed and developed an Inventory Management System using MERN stack.',
      'Implemented data visualization dashboards using Recharts to track inventory metrics.',
      'Created a responsive UI with Material-UI and optimized database queries for performance.'
    ]
  },
  {
    id: 'freelance',
    company: 'Freelance Web Developer',
    position: 'Full-Stack Developer',
    period: 'Jun 2021 - Present',
    description: [
      'Developed Bhoopati.com, a land marketplace platform with Google Maps integration and payment processing.',
      'Created Octafiles.com, an attorney booking platform with secure video meetings functionality.',
      'Provided server administration and DevOps services for multiple clients.'
    ]
  }
];

const ExperienceCard = ({ exp, isActive, toggle }: { exp: Experience, isActive: boolean, toggle: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isActive) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [isActive]);

  return (
    <div className="border-l-2 border-border-primary pl-6 pb-8 relative">
      <div className="absolute top-0 left-[-9px] w-4 h-4 bg-bg-primary border-2 border-accent-primary rounded-full"></div>
      
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
        onClick={toggle}
      >
        <div>
          <h3 className="text-xl font-bold">{exp.position}</h3>
          <div className="flex items-center text-text-secondary mt-1">
            <Briefcase size={16} className="mr-2" />
            <span>{exp.company}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2 md:mt-0">
          <div className="flex items-center text-text-secondary mr-4">
            <Calendar size={16} className="mr-2" />
            <span>{exp.period}</span>
          </div>
          
          <button 
            className="text-accent-primary border border-border-primary p-1 rounded-sm hover:bg-accent-primary/10 transition-colors"
            aria-label={isActive ? "Collapse details" : "Expand details"}
          >
            {isActive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      
      <div
        ref={contentRef}
        className="overflow-hidden opacity-0 h-0 mt-4"
      >
        <ul className="list-disc pl-4 space-y-2 text-text-secondary">
          {exp.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [activeExp, setActiveExp] = useState<string | null>('balkrushna'); // Start with first one open
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
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
    
    if (timelineRef.current) {
      const items = timelineRef.current.children;
      tl.fromTo(items, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 }, 
        "-=0.3"
      );
    }
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  const toggleExp = (id: string) => {
    setActiveExp(activeExp === id ? null : id);
  };

  return (
    <section id="experience" ref={sectionRef} className="section bg-bg-primary">
      <div className="max-w-6xl mx-auto w-full">
        <h2 ref={titleRef} className="section-title">Experience</h2>
        
        <div className="mt-12">
          <div ref={timelineRef} className="space-y-0">
            {experienceData.map(exp => (
              <ExperienceCard 
                key={exp.id} 
                exp={exp} 
                isActive={activeExp === exp.id}
                toggle={() => toggleExp(exp.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
