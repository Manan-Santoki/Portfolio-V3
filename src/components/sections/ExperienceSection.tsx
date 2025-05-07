
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Briefcase } from 'lucide-react';

// Register ScrollTrigger plugin
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
      'Developed an AI Chatbot using LangChain and integrated it with company\'s knowledge base.',
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

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate section title
    timeline.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
    
    // Animate timeline line drawing
    if (timelineRef.current) {
      timeline.fromTo(
        timelineRef.current,
        { height: 0 },
        { height: '100%', duration: 1.5, ease: "power3.inOut" },
        "-=0.4"
      );
    }
    
    // Animate each experience card with staggered effect
    experienceRefs.current.forEach((ref, index) => {
      if (!ref) return;
      
      timeline.fromTo(
        ref,
        { 
          opacity: 0, 
          x: index % 2 === 0 ? -50 : 50 
        },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          ease: "power3.out" 
        },
        "-=0.6"
      );
      
      // Animate achievement items within each card
      const achievements = ref.querySelectorAll(".achievement-item");
      timeline.fromTo(
        achievements,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 0.5, 
          ease: "power3.out" 
        },
        "-=0.4"
      );
    });
    
    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section bg-bg-primary">
      <div className="max-w-6xl mx-auto w-full">
        <h2 ref={titleRef} className="section-title">Experience</h2>
        
        <div className="mt-12 relative">
          {/* Timeline line */}
          <div
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-accent-primary h-full z-0"
          />
          
          {/* Experience items */}
          <div className="relative z-10">
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => { experienceRefs.current[index] = el; }}
                className={`flex mb-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-accent-primary border-2 border-bg-primary"></div>
                </div>
                
                {/* Content card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <Card className="h-full border-border-primary bg-bg-primary hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-text-primary mb-1">
                        {exp.position}
                      </h3>
                      
                      <div className="flex items-center text-text-secondary mb-2">
                        <Briefcase size={16} className="mr-2" />
                        <span>{exp.company}</span>
                      </div>
                      
                      <Badge variant="outline" className="mb-4 flex items-center text-text-secondary">
                        <Calendar size={14} className="mr-2" />
                        {exp.period}
                      </Badge>
                      
                      <ul className="space-y-2 mt-4">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="achievement-item flex items-start text-text-secondary"
                          >
                            <span className="inline-block w-2 h-2 rounded-full bg-accent-primary mt-2 mr-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
