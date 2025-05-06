
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CapabilityCard from '../ui/CapabilityCard';
import { Code, ServerCog, Brain, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  
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
    .fromTo(contentRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7 }, 
      "-=0.4"
    )
    .fromTo(photoRef.current, 
      { opacity: 0, x: 30 }, 
      { opacity: 1, x: 0, duration: 0.7 }, 
      "-=0.5"
    );
    
    // Capabilities staggered animation
    if (capabilitiesRef.current) {
      const cards = capabilitiesRef.current.querySelectorAll('.capability-card');
      tl.fromTo(cards, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 
        "-=0.3"
      );
    }
    
    // Certifications animation
    tl.fromTo(certRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7 }, 
      "-=0.2"
    );
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-bg-primary">
      <div className="max-w-6xl mx-auto w-full">
        <h2 ref={titleRef} className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div ref={contentRef} className="lg:col-span-2">
            <p className="text-lg mb-6">
              I'm a passionate tech enthusiast with expertise in Full-Stack Development, DevOps, and AI/ML. 
              With a solid academic foundation from VIT Vellore (CGPA: 7.72), I blend theoretical knowledge 
              with practical skills to create innovative solutions.
            </p>
            
            <p className="text-lg mb-6">
              My experience ranges from developing MERN stack applications to implementing CI/CD pipelines 
              and building AI chatbots. I thrive in environments where I can apply my multidisciplinary skills 
              to solve complex technical challenges.
            </p>
            
            <p className="text-text-secondary italic">
              "Technology is best when it brings people together."
            </p>
            
            <div ref={capabilitiesRef} className="mt-12">
              <h3 className="text-2xl font-bold mb-6 border-l-4 border-accent-primary pl-3">
                Core Capabilities
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CapabilityCard 
                  title="Full-Stack Development"
                  description="Building end-to-end web applications with modern frameworks like React, Node.js, and Next.js."
                  icon={<Code className="text-accent-primary" size={24} />}
                />
                
                <CapabilityCard 
                  title="DevOps Engineering"
                  description="Setting up CI/CD pipelines, containerization with Docker, orchestration with Kubernetes."
                  icon={<ServerCog className="text-accent-primary" size={24} />}
                />
                
                <CapabilityCard 
                  title="AI/ML Development"
                  description="Creating intelligent systems using TensorFlow, Keras, LangChain, and fine-tuning LLMs."
                  icon={<Brain className="text-accent-primary" size={24} />}
                />
                
                <CapabilityCard 
                  title="Leadership & Project Management"
                  description="Managing projects from concept to deployment with effective team collaboration."
                  icon={<Award className="text-accent-primary" size={24} />}
                />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div ref={photoRef} className="mb-8">
              <div className="relative border-2 border-border-primary p-1 w-full max-w-md mx-auto lg:mx-0">
                {/* Replace with actual profile image */}
                <div className="aspect-[3/4] bg-border-primary relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    <p className="text-sm">Profile Photo</p>
                  </div>
                  {/* If you have an actual image: */}
                  {/* <img 
                    src="/path-to-your-image.jpg" 
                    alt="Manan Santoki" 
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                <span className="absolute -bottom-2 -right-2 w-12 h-12 border-2 border-accent-primary bg-bg-primary"></span>
              </div>
              
              <div ref={certRef} className="mt-10">
                <h3 className="text-2xl font-bold mb-6 border-l-4 border-accent-primary pl-3">
                  Certifications
                </h3>
                
                <div className="space-y-4">
                  <div className="border border-border-primary p-4 hover:border-accent-primary transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-accent-primary"></div>
                      <h4 className="font-semibold">AWS Certified Solutions Architect – Associate</h4>
                    </div>
                  </div>
                  
                  <div className="border border-border-primary p-4 hover:border-accent-primary transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-accent-primary"></div>
                      <h4 className="font-semibold">Cloud Digital Leader</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
