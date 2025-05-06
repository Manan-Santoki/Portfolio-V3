
import React, { useContext, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { SkillsContext } from '../sections/SkillsSection';

interface SkillTagProps {
  skill: string;
  className?: string;
}

const SkillTag = ({ skill, className }: SkillTagProps) => {
  const { activeSkill, setActiveSkill } = useContext(SkillsContext);
  const tagRef = useRef<HTMLDivElement>(null);
  const isActive = activeSkill === skill;
  
  useEffect(() => {
    if (!tagRef.current) return;
    
    const tag = tagRef.current;
    
    const enterAnimation = () => {
      gsap.to(tag, {
        borderColor: '#00B7FF',
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      });
    };
    
    const leaveAnimation = () => {
      if (isActive) return;
      
      gsap.to(tag, {
        borderColor: '#555555',
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    };
    
    tag.addEventListener('mouseenter', enterAnimation);
    tag.addEventListener('mouseleave', leaveAnimation);
    
    return () => {
      tag.removeEventListener('mouseenter', enterAnimation);
      tag.removeEventListener('mouseleave', leaveAnimation);
    };
  }, [isActive]);
  
  useEffect(() => {
    if (!tagRef.current) return;
    
    if (isActive) {
      gsap.to(tagRef.current, {
        borderColor: '#00B7FF',
        backgroundColor: 'rgba(0, 183, 255, 0.1)',
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(tagRef.current, {
        borderColor: '#555555',
        backgroundColor: 'transparent',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isActive]);

  const handleClick = () => {
    setActiveSkill(isActive ? null : skill);
    
    // Scroll to projects section if skill is selected
    if (!isActive) {
      setTimeout(() => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <div
      ref={tagRef}
      onClick={handleClick}
      className={cn(
        "skill-tag flex items-center",
        isActive && "border-accent-primary",
        className
      )}
    >
      <span>{skill}</span>
    </div>
  );
};

export default SkillTag;
