
import React, { useContext } from 'react';
import gsap from 'gsap';
import { SkillsContext } from '../sections/SkillsSection';
import SkillTag from './SkillTag';

interface SkillPanelProps {
  title: string;
  skills: string[];
}

const SkillPanel = ({ title, skills }: SkillPanelProps) => {
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!panelRef.current) return;

    // Set up hover animation
    const panel = panelRef.current;
    
    const enterAnimation = () => {
      gsap.to(panel, {
        borderColor: '#00B7FF',
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const leaveAnimation = () => {
      gsap.to(panel, {
        borderColor: '#555555',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    panel.addEventListener('mouseenter', enterAnimation);
    panel.addEventListener('mouseleave', leaveAnimation);
    
    return () => {
      panel.removeEventListener('mouseenter', enterAnimation);
      panel.removeEventListener('mouseleave', leaveAnimation);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="border-2 border-border-primary p-6 skill-panel transition-all duration-300"
    >
      <h3 className="font-bold text-2xl mb-6 border-l-4 border-accent-primary pl-3">{title}</h3>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillPanel;
