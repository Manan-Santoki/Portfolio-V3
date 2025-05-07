
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2021 - 2025',
    courses: ['Artificial Intelligence', 'Machine Learning', 'Database Systems', 'Computer Networks', 'Cloud Computing']
  },
  {
    id: 'urmi',
    institution: 'Urmi School',
    degree: 'Higher Secondary Education',
    period: '2019 - 2021',
    grade: 'Percentage: 85%',
    courses: []
  },
  {
    id: 'bright',
    institution: 'Bright Day School',
    degree: 'Secondary Education',
    period: '2008 - 2019',
    grade: 'Percentage: 92%',
    courses: []
  }
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
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
    );
    
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      tl.fromTo(cards, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 
        "-=0.3"
      );
    }
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section bg-bg-primary">
      <div className="max-w-6xl mx-auto w-full">
        <h2 ref={titleRef} className="section-title">Education</h2>
        
        <div ref={cardsRef} className="mt-12 space-y-8">
          {educationData.map(edu => (
            <div
              key={edu.id}
              className="border-2 border-border-primary p-6 hover:border-accent-primary transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    <GraduationCap className="mr-2 text-accent-primary" size={20} />
                    {edu.institution}
                  </h3>
                  <p className="text-text-secondary mt-1">{edu.degree}</p>
                </div>
                
                <div className="mt-2 md:mt-0 flex items-center text-text-secondary">
                  <Calendar size={16} className="mr-2" />
                  <span>{edu.period}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="font-medium">{edu.grade}</p>
                
                {edu.courses.length > 0 && (
                  <>
                    <p className="mt-4 text-sm text-text-secondary">Key Courses:</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {edu.courses.map(course => (
                        <span 
                          key={course}
                          className="text-xs py-1 px-2 border border-border-primary text-text-secondary"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
