import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SkillTag from './SkillTag';

interface SkillPanelProps {
  title: string;
  skills: string[];
}

const SkillPanel = ({ title, skills }: SkillPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    const panel = panelRef.current;

    const enterAnimation = () => {
      gsap.to(panel, {
        borderColor: '#00B7FF',
        scale: 1.01,
        boxShadow: '0 4px 12px rgba(0, 183, 255, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const leaveAnimation = () => {
      gsap.to(panel, {
        borderColor: '#555555',
        scale: 1,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
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
      className="border-2 border-border-primary p-4 md:p-6 skill-panel transition-all duration-300 bg-bg-secondary/50  shadow-sm hover:shadow-md"
    >
      <h3 className="font-bold text-xl md:text-2xl mb-4 md:mb-6 border-l-4 border-accent-primary pl-3 text-text-primary">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillPanel;
