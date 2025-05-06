
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubCalendar from 'react-github-calendar';
import { Github, Globe, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  
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
    .fromTo(calendarRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7 }, 
      "-=0.4"
    );
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  // Custom theme for GitHub calendar
  const calendarTheme = {
    level0: '#111111',
    level1: 'rgba(0, 183, 255, 0.25)',
    level2: 'rgba(0, 183, 255, 0.5)',
    level3: 'rgba(0, 183, 255, 0.75)',
    level4: '#00B7FF',
  };

  return (
    <section id="contact" ref={sectionRef} className="section bg-bg-primary">
      <div className="max-w-6xl mx-auto w-full">
        <h2 ref={titleRef} className="section-title">Contact</h2>
        
        <div ref={contentRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-accent-primary pl-3">
              Get In Touch
            </h3>
            
            <p className="text-lg mb-8">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out.
            </p>
            
            <div className="space-y-4">
              <a 
                href="mailto:manansantoki2003@gmail.com" 
                className="flex items-center gap-3 text-text-primary hover:text-accent-primary transition-colors"
              >
                <div className="p-2 border-2 border-border-primary">
                  <Mail size={20} />
                </div>
                <span>manansantoki2003@gmail.com</span>
              </a>
              
              <a 
                href="tel:+918460342667" 
                className="flex items-center gap-3 text-text-primary hover:text-accent-primary transition-colors"
              >
                <div className="p-2 border-2 border-border-primary">
                  <Phone size={20} />
                </div>
                <span>+91-8460342667</span>
              </a>
              
              <a 
                href="https://github.com/manan-santoki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-accent-primary transition-colors"
              >
                <div className="p-2 border-2 border-border-primary">
                  <Github size={20} />
                </div>
                <span>github.com/manan-santoki</span>
              </a>
              
              <a 
                href="https://manansantoki.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-accent-primary transition-colors"
              >
                <div className="p-2 border-2 border-border-primary">
                  <Globe size={20} />
                </div>
                <span>manansantoki.xyz</span>
              </a>
            </div>
          </div>
          
          <div ref={calendarRef}>
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-accent-primary pl-3">
              GitHub Contributions
            </h3>
            
            <div className="border-2 border-border-primary p-4 bg-bg-primary">
              <GitHubCalendar
                username="manan-santoki"
                colorScheme="dark"
                theme={calendarTheme}
                hideColorLegend
                hideMonthLabels={false}
                labels={{
                  totalCount: '{{count}} contributions in the last year',
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-border-primary pt-8">
          <p className="text-center text-text-secondary">
            © {new Date().getFullYear()} Manan Santoki. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
