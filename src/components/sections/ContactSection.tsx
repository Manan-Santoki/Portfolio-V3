import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubCalendar from 'react-github-calendar';
import { Github, Globe, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Renamed and repurposed refs for clearer animation targets
  const getInTouchRef = useRef<HTMLDivElement>(null);
  const githubContributionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%", // Animation starts when 70% of the section is visible from top
        end: "bottom 20%", // Ends when bottom of section is 20% from top (can be adjusted)
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7 }
    )
    .fromTo(getInTouchRef.current, // Animate the "Get In Touch" block
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4" // Stagger start relative to previous animation
    )
    .fromTo(githubContributionsRef.current, // Animate the "GitHub Contributions" block
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4" // Stagger start relative to previous animation
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill(); // Also kill the timeline itself
    };
  }, []);

  // Custom theme for GitHub calendar
  const calendarTheme = {
    level0: '#111111', // Corresponds to a dark background, almost invisible contributions
    level1: 'rgba(0, 183, 255, 0.25)',
    level2: 'rgba(0, 183, 255, 0.5)',
    level3: 'rgba(0, 183, 255, 0.75)',
    level4: '#00B7FF', // Strongest contribution color
  };

  return (
    <section id="contact" ref={sectionRef} className="section bg-bg-primary py-16 md:py-24">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="section-title text-center mb-12 md:mb-16">Contact</h2>

        {/* Get In Touch Block */}
        <div ref={getInTouchRef} className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-accent-primary pl-4">
            Get In Touch
          </h3>
          <p className="text-lg text-text-secondary mb-8">
            I'm always interested in hearing about new projects and opportunities.
            Whether you have a question or just want to say hi, feel free to reach out.
          </p>
          <div className="space-y-5">
            <a
              href="mailto:manansantoki2003@gmail.com"
              className="flex items-center gap-4 text-text-primary hover:text-accent-primary transition-colors group"
            >
              <div className="p-3 border-2 border-border-primary rounded group-hover:border-accent-primary transition-colors">
                <Mail size={22} />
              </div>
              <span className="text-lg">manansantoki2003@gmail.com</span>
            </a>
            <a
              href="tel:+918460342667"
              className="flex items-center gap-4 text-text-primary hover:text-accent-primary transition-colors group"
            >
              <div className="p-3 border-2 border-border-primary rounded group-hover:border-accent-primary transition-colors">
                <Phone size={22} />
              </div>
              <span className="text-lg">+91-8460342667</span>
            </a>
            <a
              href="https://github.com/manan-santoki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-text-primary hover:text-accent-primary transition-colors group"
            >
              <div className="p-3 border-2 border-border-primary rounded group-hover:border-accent-primary transition-colors">
                <Github size={22} />
              </div>
              <span className="text-lg">github.com/manan-santoki</span>
            </a>
            <a
              href="https://manansantoki.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-text-primary hover:text-accent-primary transition-colors group"
            >
              <div className="p-3 border-2 border-border-primary rounded group-hover:border-accent-primary transition-colors">
                <Globe size={22} />
              </div>
              <span className="text-lg">manansantoki.xyz</span>
            </a>
          </div>
        </div>

        {/* GitHub Contributions Block */}
        <div ref={githubContributionsRef}>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-accent-primary pl-4">
            GitHub Contributions
          </h3>
          <div className="border-2 border-border-primary p-4 sm:p-6 rounded-lg bg-bg-secondary shadow-lg">
            {/* Ensure GitHubCalendar component is responsive or fits well.
                The library usually handles responsiveness for the calendar itself. */}
            <GitHubCalendar
              username="manan-santoki"
              // theme={calendarTheme} // Apply the custom theme
              colorScheme="dark" // theme prop takes precedence
              hideColorLegend={false} // Optionally show legend if theme makes sense with it
              hideTotalCount={false}
              blockSize={15} // Adjust block size if needed
              blockMargin={4}
              fontSize={14} // Adjust font size for labels if needed
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
            />
          </div>
        </div>

        <div className="mt-16 md:mt-24 border-t border-border-primary pt-8">
          <p className="text-center text-text-secondary">
            © {new Date().getFullYear()} Manan Santoki. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;