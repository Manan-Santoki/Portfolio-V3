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
        backgroundColor: 'rgba(0, 183, 255, 0.05)',
        scale: 1.05,
        boxShadow: '0 2px 8px rgba(0, 183, 255, 0.3)',
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    const leaveAnimation = () => {
      if (isActive) return;
      gsap.to(tag, {
        borderColor: '#555555',
        backgroundColor: 'transparent',
        scale: 1,
        boxShadow: 'none',
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
        backgroundColor: 'rgba(0, 183, 255, 0.15)',
        scale: 1.05,
        boxShadow: '0 2px 8px rgba(0, 183, 255, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(tagRef.current, {
        borderColor: '#555555',
        backgroundColor: 'transparent',
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isActive]);

  const handleClick = () => {
    setActiveSkill(isActive ? null : skill);
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
        "skill-tag flex items-center cursor-pointer px-4 py-2 rounded-md border border-border-primary text-sm transition-all duration-300 text-text-primary hover:text-accent-primary",
        isActive && "border-accent-primary text-accent-primary font-medium",
        className
      )}
    >
      <span>{skill}</span>
    </div>
  );
};

export default SkillTag;
