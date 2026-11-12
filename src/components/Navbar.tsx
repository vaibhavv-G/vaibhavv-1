import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onContactClick?: () => void;
}

export function Navbar({ onContactClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] py-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            : 'bg-white/85 backdrop-blur-sm border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#home');
            }}
            className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4169E1] rounded-lg"
          >
            <span className="w-8 h-8 rounded-lg bg-[#171717] text-white flex items-center justify-center font-bold text-xs tracking-wider transition-transform duration-200 group-hover:scale-105">
              VG
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-[#171717]">
                Vaibhav Garad
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#777777]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 relative text-[13px] lg:text-sm ${
                    isActive ? 'text-[#171717] font-semibold' : 'hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4169E1] rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary CTA Button + Mobile toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onContactClick) onContactClick();
                scrollTo('#contact');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-[#4169E1] hover:bg-[#3154b3] rounded-lg transition-all duration-200 shadow-xs whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4169E1]"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-[#171717] hover:bg-[#F8F9FA] rounded-lg border border-[#EAEAEA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4169E1]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-white border-b border-[#EAEAEA] shadow-lg"
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#F8F9FA] text-[#4169E1] font-semibold'
                          : 'text-[#171717] hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4169E1]" />}
                    </a>
                  );
                })}
                <div className="pt-2 mt-1 border-t border-[#F8F9FA]">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onContactClick) onContactClick();
                      scrollTo('#contact');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#4169E1] hover:bg-[#3154b3] rounded-lg transition-colors shadow-xs"
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Dim backdrop when mobile menu is open */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-xs"
          />
        )}
      </AnimatePresence>
    </>
  );
}
