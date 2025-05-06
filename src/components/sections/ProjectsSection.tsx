
import React, { useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillsContext } from './SkillsSection';
import ProjectCard from '../ui/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Bhoopati.com",
    description: "Land marketplace platform built with MERN stack, integrating Google Maps and Razorpay for seamless land discovery and transactions.",
    imageUrl: "/placeholder.svg",
    tags: ["React", "MongoDB", "Express", "NodeJS", "Google Maps", "Razorpay"],
    link: "#"
  },
  {
    title: "Octafiles.com",
    description: "Attorney booking platform featuring secure video meetings and encrypted chatbox for confidential client communications.",
    imageUrl: "/placeholder.svg",
    tags: ["React", "NodeJS", "WebRTC", "Socket.io", "Encryption"],
    link: "#"
  },
  {
    title: "AI Chatbot with LangChain RAG",
    description: "Advanced conversational AI using document embedding and retrieval augmented generation for context-aware responses.",
    imageUrl: "/placeholder.svg",
    tags: ["Python", "LangChain", "TensorFlow", "NLP", "Vector Database"],
    link: "#"
  },
  {
    title: "Inventory Control System",
    description: "Full-stack inventory management solution with real-time tracking and analytics dashboards for business optimization.",
    imageUrl: "/placeholder.svg",
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS", "Recharts", "Authentication"],
    link: "#"
  },
  {
    title: "Fine-Tuning LLM with Qlora",
    description: "Custom optimization of large language models using QLoRA technique for domain-specific applications with reduced computational needs.",
    imageUrl: "/placeholder.svg",
    tags: ["PyTorch", "Transformers", "CUDA", "Python", "AI/ML"],
    link: "#"
  }
];

const ProjectsSection = () => {
  const { activeSkill } = useContext(SkillsContext);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (activeSkill) {
      const filtered = projectsData.filter(project => 
        project.tags.some(tag => 
          tag.toLowerCase().includes(activeSkill.toLowerCase()) || 
          activeSkill.toLowerCase().includes(tag.toLowerCase())
        )
      );
      setFilteredProjects(filtered.length > 0 ? filtered : projectsData);
    } else {
      setFilteredProjects(projectsData);
    }
  }, [activeSkill]);
  
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
    )
    .fromTo(descRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7 }, 
      "-=0.4"
    );
    
    if (projectsGridRef.current) {
      const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
      tl.fromTo(projectCards, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.15,
          ease: "power2.out"
        }, 
        "-=0.4"
      );
    }
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section bg-bg-primary">
      <div className="max-w-6xl mx-auto w-full">
        <h2 ref={titleRef} className="section-title">
          Projects 
          {activeSkill && <span className="text-accent-primary ml-2">/ {activeSkill}</span>}
        </h2>
        
        <p ref={descRef} className="text-lg mb-12">
          {activeSkill 
            ? `Showing projects related to ${activeSkill}. These demonstrate my practical application of this technology.` 
            : `Explore my portfolio of projects spanning web development, DevOps infrastructure, and AI/ML solutions.`
          }
        </p>
        
        <div 
          ref={projectsGridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title}
              project={project}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-text-secondary">No projects match the selected skill.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
