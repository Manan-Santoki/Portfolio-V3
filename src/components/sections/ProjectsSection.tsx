import React, { useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillsContext, SkillsContextType } from './SkillsSection'; // Assuming SkillsContextType is exported
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code, Eye, X, SearchX, Target, Lightbulb, User, AlertTriangle } from "lucide-react"; // Removed ArrowRight as View Details is a button

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  fullDescription?: string;
  problem?: string;
  solution?: string;
  role?: string;
  challenges?: string;
}

// Using original placeholder image for consistency with your setup
const placeholderImage = "/placeholder.svg"; // Or your specific default placeholder

const projectsData: Project[] = [
  {
    id: "bhoopati",
    title: "Bhoopati.com",
    description: "Land marketplace platform built with MERN stack, integrating Google Maps and Razorpay for seamless land discovery and transactions.",
    image: "https://s3.manansantoki.xyz/public/bhoopati.com.png", // Use your placeholder or specific image path
    tech: ["React", "MongoDB", "Express", "NodeJS", "Google Maps", "Razorpay", "TailwindCSS", "Redux"],
    githubUrl: "#",
    liveUrl: "#",
    fullDescription: "A comprehensive platform connecting land sellers with potential buyers, featuring advanced search, map-based discovery, and secure payment processing. The goal was to modernize the often opaque process of land acquisition.",
    problem: "Traditional land buying processes are fragmented, with limited visibility and high dependency on intermediaries, leading to inefficiencies and lack of transparency.",
    solution: "Created a centralized digital marketplace with verified listings, interactive map-based search, secure online payment integration, and direct communication channels to streamline transactions.",
    role: "Full-stack developer responsible for the entire application lifecycle: from conceptualization, UI/UX design, database architecture, to frontend (React) and backend (Node.js/Express) development, and third-party API integrations.",
    challenges: "Implementing secure and reliable payment processing with Razorpay, and integrating complex Google Maps features for accurate property boundary visualization and geofencing."
  },
  {
    id: "octafiles",
    title: "Octafiles.com",
    description: "Attorney booking platform featuring secure video meetings and encrypted chatbox for confidential client communications.",
    image:  "https://s3.manansantoki.xyz/public/octafiles.com.png",
    tech: ["React", "NodeJS", "WebRTC", "Socket.io", "Encryption", "PostgreSQL", "AWS S3"],
    githubUrl: "#",
    liveUrl: "#",
    fullDescription: "A secure, HIPAA-compliant (if applicable, or similar standard for legal) platform designed for legal consultations, featuring end-to-end encrypted video calls, messaging, and document sharing capabilities.",
    problem: "Legal consultations demand utmost privacy and security for sensitive information, which many general-purpose video conferencing and messaging platforms do not adequately provide.",
    solution: "Built a specialized platform incorporating robust end-to-end encryption for all communications, secure document handling, and features tailored to legal workflows like appointment scheduling and case management.",
    role: "Lead developer focusing on the security architecture, real-time communication features (WebRTC and Socket.io), and database design. Ensured compliance with data privacy regulations.",
    challenges: "Implementing flawless end-to-end encryption across various modules while maintaining excellent performance and user experience, especially on unreliable network conditions."
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot with LangChain RAG",
    description: "Advanced conversational AI using document embedding and retrieval augmented generation for context-aware responses.",
    image: placeholderImage,
    tech: ["Python", "LangChain", "TensorFlow", "NLP", "Vector Database", "FastAPI", "Docker"],
    githubUrl: "#",
    fullDescription: "An intelligent chatbot capable of understanding complex queries and providing contextually relevant answers by leveraging a large knowledge base. It uses Retrieval Augmented Generation (RAG) to combine the strengths of LLMs with specific domain data.",
    problem: "Standard chatbots often lack deep contextual understanding, cannot access up-to-date or proprietary information, and tend to provide generic or sometimes incorrect responses (hallucinations).",
    solution: "Implemented a RAG system where user queries first retrieve relevant document chunks from a vectorized knowledge base. These chunks are then provided as context to a Large Language Model (LLM) to generate an informed and accurate response.",
    role: "AI Engineer. Responsibilities included data preprocessing, setting up and optimizing the vector database, developing the retrieval mechanism, fine-tuning the LLM (if applicable), and building the API for integration.",
    challenges: "Optimizing the vector search for speed and relevance over large document collections, minimizing LLM hallucination, and managing the computational costs associated with embeddings and generation."
  },
  {
    id: "inventory",
    title: "Inventory Control System",
    description: "Full-stack inventory management solution with real-time tracking and analytics dashboards for business optimization.",
    image:  "https://s3.manansantoki.xyz/public/jalaramwiremesh.com.png",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Recharts", "Authentication", "Prisma"], // Added Prisma to tech
    githubUrl: "#", // Added GitHub URL as per original structure
    liveUrl: "#",
    fullDescription: "A comprehensive inventory management system designed for small to medium-sized businesses, featuring barcode scanning, supplier management, purchase order tracking, sales analytics, and predictive stock forecasting.",
    problem: "Many small businesses rely on manual methods (e.g., spreadsheets) for inventory management, leading to stockouts, overstocking, inaccuracies, and inefficient operations.",
    solution: "Developed an intuitive, web-based system that automates inventory tracking, provides real-time stock levels, generates insightful reports, and offers tools for better forecasting and order management.",
    role: "Full-stack developer. Handled frontend development with Next.js and Tailwind CSS, backend API development with Node.js (via Next.js API routes) and Prisma ORM, and PostgreSQL database design.",
    challenges: "Designing a flexible and scalable database schema to accommodate diverse inventory types and business rules, and creating an offline-first architecture component that syncs data seamlessly when connectivity is restored."
  },
  {
    id: "llm-finetuning",
    title: "Fine-Tuning LLM with QLoRA",
    description: "Custom optimization of large language models using QLoRA technique for domain-specific applications with reduced computational needs.",
    image: placeholderImage,
    tech: ["PyTorch", "Transformers", "CUDA", "Python", "AI/ML", "Hugging Face", "Weights & Biases"],
    githubUrl: "#",
    fullDescription: "A research and development project focused on democratizing access to fine-tuning Large Language Models (LLMs) by significantly reducing their computational and memory footprints using the QLoRA (Quantized Low-Rank Adaptation) technique.",
    problem: "Fine-tuning state-of-the-art LLMs typically requires substantial GPU resources (memory and compute), making it inaccessible for many researchers, developers, and smaller organizations.",
    solution: "Implemented and experimented with QLoRA, which involves quantizing a pretrained model to 4-bit precision and then attaching small, trainable Low-Rank Adapters. This allows for effective fine-tuning on consumer-grade GPUs.",
    role: "ML Engineer. Responsible for setting up the training environment, implementing the QLoRA methodology, conducting experiments on various datasets, benchmarking performance against traditional fine-tuning, and documenting findings.",
    challenges: "Balancing model performance (e.g., perplexity, task-specific metrics) with the aggressive quantization and memory constraints. Also, optimizing the training pipeline for speed and stability with limited hardware."
  }
];

const ProjectCard = ({ project, onOpenModal }: { project: Project, onOpenModal: (project: Project) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Hover animation from original code
    if (!cardRef.current) return;
    const cardElement = cardRef.current;

    const handleMouseEnter = () => {
      gsap.to(cardElement, {
        scale: 1.03, // Original scale
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)", // Original shadow
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardElement, {
        scale: 1, // Original scale
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Original shadow
        duration: 0.3,
        ease: "power2.out",
      });
    };

    cardElement.addEventListener("mouseenter", handleMouseEnter);
    cardElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cardElement.removeEventListener("mouseenter", handleMouseEnter);
      cardElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className="overflow-hidden h-full flex flex-col bg-bg-primary border-border-primary hover:shadow-lg transition-all duration-300 project-card" // Original classes + project-card
    >
      <div className="relative overflow-hidden aspect-video"> {/* Retained aspect ratio for image consistency */}
        <img
          src={project.image || placeholderImage} // Use defined placeholder
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" // Original image hover
        />
      </div>
      <CardContent className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-semibold mb-2 text-text-primary">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 flex-grow line-clamp-3">{project.description}</p> {/* Retained line-clamp for consistent height */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech, index) => ( // Original: Show 3
            <Badge
              key={index}
              variant="outline" // Original variant
              className="bg-bg-secondary text-text-secondary hover:bg-accent-primary hover:text-bg-primary text-xs" // Original classes + text-xs for slightly smaller badges
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge variant="outline" className="bg-bg-secondary text-text-secondary text-xs">
              +{project.tech.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-border-primary"> {/* Added border for separation */}
          <Button
            variant="ghost"
            className="text-text-primary hover:text-accent-primary hover:bg-transparent p-0" // Original classes
            onClick={() => onOpenModal(project)}
          >
            View Details
          </Button>
          <div className="flex gap-1"> {/* Reduced gap slightly from original "gap-2" */}
            {project.githubUrl && (
              <Button size="icon" variant="ghost" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub Repository`}
                  className="text-text-secondary hover:text-accent-primary" // Themed icon color
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="icon" variant="ghost" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} Live Demo`}
                  className="text-text-secondary hover:text-accent-primary" // Themed icon color
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectModal = ({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) => {
  if (!project) return null;

  const DetailSection = ({ title, content, icon: Icon }: { title: string, content?: string, icon?: React.ElementType }) => {
    if (!content) return null;
    return (
      <div className="mb-5">
        <h4 className="text-lg font-semibold mb-2 flex items-center text-text-primary">
          {Icon && <Icon className="h-5 w-5 mr-2 text-accent-primary" />} {/* Icon with accent color */}
          {title}
        </h4>
        <p className="text-text-secondary text-sm leading-relaxed">{content}</p>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-bg-primary text-text-primary border-border-primary sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pr-6">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-text-primary">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-text-secondary text-sm">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-1 flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-text-secondary/50 scrollbar-track-transparent"> {/* Themed scrollbar thumb */}
          <div className="relative w-full aspect-video rounded-md overflow-hidden mb-6">
            <img
              src={project.image || placeholderImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <DetailSection title="Project Overview" content={project.fullDescription} icon={Eye} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
            <DetailSection title="The Problem" content={project.problem} icon={Target} />
            <DetailSection title="The Solution" content={project.solution} icon={Lightbulb} />
            <DetailSection title="My Role" content={project.role} icon={User} />
            <DetailSection title="Key Challenges" content={project.challenges} icon={AlertTriangle} />
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 flex items-center text-text-primary">
              <Code className="h-5 w-5 mr-2 text-accent-primary" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline" // Consistent with card badges
                  className="bg-bg-secondary text-text-secondary text-xs" // Original modal badge style
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-4 pt-4 border-t border-border-primary sm:justify-start">
          <div className="flex flex-wrap gap-3 w-full justify-end">
            {project.githubUrl && (
              <Button 
                variant="outline" // Shadcn outline typically uses border color
                className="border-border-primary text-text-primary hover:bg-accent-primary hover:text-bg-primary flex-grow sm:flex-grow-0" // Themed outline button
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button 
                className="bg-accent-primary text-bg-primary hover:bg-accent-primary/90 flex-grow sm:flex-grow-0" // Themed primary action button
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            <DialogClose asChild>
                <Button 
                  variant="ghost" 
                  className="text-text-secondary hover:text-text-primary hover:bg-bg-secondary flex-grow sm:flex-grow-0" // Themed ghost button for close
                >
                    Close
                </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ProjectsSection = () => {
  const context = useContext(SkillsContext);
  const { activeSkill, setActiveSkill } = context || { activeSkill: null, setActiveSkill: () => {} } as SkillsContextType;

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSkill) {
      const lowerCaseActiveSkill = activeSkill.toLowerCase();
      const filtered = projectsData.filter((project) =>
        project.tech.some((tech) => tech.toLowerCase() === lowerCaseActiveSkill)
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projectsData);
    }
  }, [activeSkill]);
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%", // Ensure this is appropriate for section length
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
    
    const projectCards = projectsGridRef.current?.querySelectorAll('.project-card');
    if (projectCards && projectCards.length > 0) {
        gsap.fromTo(projectCards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                // This ScrollTrigger will animate cards as the grid itself comes into view
                scrollTrigger: { 
                    trigger: projectsGridRef.current, // Trigger when the grid starts entering viewport
                    start: "top 85%", // Start animation when top of grid is 85% from top of viewport
                    toggleActions: "play none none none",
                }
            }
        );
    }
    
    return () => {
        tl.kill();
        // More specific cleanup for ScrollTriggers created by this component
        ScrollTrigger.getAll().forEach(st => {
            if (st.trigger === sectionRef.current || st.trigger === projectsGridRef.current || (projectCards && Array.from(projectCards).includes(st.trigger as Element))) {
                st.kill();
            }
        });
        gsap.killTweensOf(projectCards); // Kill any direct tweens on cards
    };
  }, [filteredProjects]);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const handleClearFilter = () => {
    if (setActiveSkill) {
      setActiveSkill(null);
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="section py-16 md:py-24 bg-bg-primary text-text-primary"> {/* Reverted section class and colors */}
      <div className="container mx-auto px-4"> {/* Using container for consistency; you can use max-w-6xl if preferred */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="section-title text-3xl md:text-4xl font-bold mb-2 text-text-primary"> {/* section-title for consistency + explicit colors */}
            My Recent <span className="text-accent-primary">Work</span> {/* Use accent for "Work" */}
          </h2>
          {activeSkill && (
            <div className="flex items-center justify-center gap-2 my-4"> {/* Added 'my-4' for spacing */}
              <Badge
                variant="outline" // Use outline for a less dominant filter badge
                className="border-accent-primary text-accent-primary text-sm" // Themed filter badge
              >
                Filtered by: {activeSkill}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilter}
                className="text-accent-primary hover:bg-accent-primary/10 h-auto p-1"
                aria-label="Clear skill filter"
              >
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            </div>
          )}
          <p ref={descRef} className="text-lg text-text-secondary">
            {activeSkill
              ? `Showing projects where I've applied ${activeSkill}.`
              : `A selection of projects showcasing my skills in web development, AI/ML, and more.`
            }
          </p>
        </div>

        <div
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && activeSkill && (
          <div className="text-center py-12 mt-8 bg-bg-secondary border border-border-primary rounded-lg p-8"> {/* Themed "No Results" box */}
            <SearchX className="h-16 w-16 text-text-secondary mx-auto mb-4" />
            <p className="text-xl font-semibold text-text-primary mb-2">No projects found for "{activeSkill}"</p>
            <p className="text-text-secondary mb-4">
              Try selecting a different skill or clear the filter to see all projects.
            </p>
            <Button 
              onClick={handleClearFilter} 
              variant="outline"
              className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-bg-primary" // Themed outline button
            >
              <X className="h-4 w-4 mr-2" /> Clear Filter & View All
            </Button>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ProjectsSection;

// Ensure your SkillsContext and SkillsContextType are correctly defined and provided.
// Example:
// export interface SkillsContextType {
//   activeSkill: string | null;
//   setActiveSkill: (skill: string | null) => void;
// }
// export const SkillsContext = React.createContext<SkillsContextType | undefined>(undefined);