
import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
  className?: string;
}

const ProjectCard = ({ project, delay = 0, className }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const tags = tagsRef.current;
    const link = linkRef.current;
    
    // Hover animations
    const enterAnimation = () => {
      gsap.to(card, {
        borderColor: '#00B7FF',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(image, {
        filter: 'grayscale(0)',
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(link, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        delay: 0.1,
        ease: 'power2.out'
      });
    };
    
    const leaveAnimation = () => {
      gsap.to(card, {
        borderColor: '#555555',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(image, {
        filter: 'grayscale(1)',
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(tags, {
        opacity: 0.6,
        y: 10,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(link, {
        opacity: 0,
        x: 10,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    card.addEventListener('mouseenter', enterAnimation);
    card.addEventListener('mouseleave', leaveAnimation);
    
    // Initial state
    gsap.set(image, { filter: 'grayscale(1)' });
    gsap.set(tags, { opacity: 0.6, y: 10 });
    gsap.set(link, { opacity: 0, x: 10 });
    
    return () => {
      card.removeEventListener('mouseenter', enterAnimation);
      card.removeEventListener('mouseleave', leaveAnimation);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "project-card border-2 border-border-primary flex flex-col h-full",
        className
      )}
    >
      <div 
        ref={imageRef}
        className="aspect-video overflow-hidden"
      >
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div ref={contentRef} className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
        <p className="text-text-secondary text-sm">{project.description}</p>
        
        <div className="flex justify-between items-end mt-6">
          <div ref={tagsRef} className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="text-xs py-1 px-2 border border-border-primary text-text-secondary"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs py-1 px-2 text-text-secondary">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          <a 
            ref={linkRef}
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent-primary hover:underline flex items-center gap-1 text-sm"
          >
            View <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
