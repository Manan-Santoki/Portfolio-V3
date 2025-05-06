
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface CapabilityCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const CapabilityCard = ({ 
  title, 
  description, 
  icon, 
  className 
}: CapabilityCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Hover animation
    const card = cardRef.current;
    const content = contentRef.current;
    
    const enterAnimation = () => {
      gsap.to(card, {
        borderColor: '#00B7FF',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        y: -10,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    const leaveAnimation = () => {
      gsap.to(card, {
        borderColor: '#555555',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    card.addEventListener('mouseenter', enterAnimation);
    card.addEventListener('mouseleave', leaveAnimation);
    
    return () => {
      card.removeEventListener('mouseenter', enterAnimation);
      card.removeEventListener('mouseleave', leaveAnimation);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "border-2 border-border-primary p-6 capability-card relative overflow-hidden transition-all duration-300",
        className
      )}
    >
      <div ref={contentRef} className="relative z-10">
        {icon && (
          <div className="mb-4">
            {icon}
          </div>
        )}
        
        <h4 className="font-bold text-xl mb-3">{title}</h4>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
      
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  );
};

export default CapabilityCard;
