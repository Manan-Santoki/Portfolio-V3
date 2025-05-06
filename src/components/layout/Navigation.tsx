
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#hero', text: 'Home' },
  { href: '#about', text: 'About' },
  { href: '#skills', text: 'Skills' },
  { href: '#projects', text: 'Projects' },
  { href: '#experience', text: 'Experience' },
  { href: '#education', text: 'Education' },
  { href: '#contact', text: 'Contact' }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-12 lg:px-24",
      isScrolled ? 'bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary' : 'bg-transparent'
    )}>
      <nav className="flex items-center justify-between h-16 md:h-20">
        <a 
          href="#hero" 
          className="text-2xl font-extrabold text-text-primary hover:text-accent-primary transition-colors"
          onClick={(e) => scrollToSection(e, '#hero')}
        >
          MS<span className="text-accent-primary">.</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <a 
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "relative text-sm font-semibold transition-colors hover:text-accent-primary py-1",
                activeSection === link.href.slice(1) ? 'text-accent-primary' : 'text-text-primary'
              )}
            >
              {link.text}
              {activeSection === link.href.slice(1) && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent-primary" />
              )}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-primary hover:text-accent-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 bg-bg-primary z-40 flex flex-col md:hidden">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map(link => (
                <a 
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    "text-xl font-bold transition-colors",
                    activeSection === link.href.slice(1) ? 'text-accent-primary' : 'text-text-primary'
                  )}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
