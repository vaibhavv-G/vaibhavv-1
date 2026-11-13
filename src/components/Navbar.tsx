import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = ['home', 'services', 'projects', 'contact'];
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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
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
            ? 'bg-[#0B1120]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/15'
            : 'bg-[#0B1120]/80 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#home');
            }}
            className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg"
          >
            <span className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm shadow-[#2563EB]/30 transition-transform duration-200 group-hover:scale-105">
              VG
            </span>
            <span className="font-display font-bold text-base tracking-tight text-white">
              Vaibhav Garad
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
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
                  className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 relative ${
                    isActive ? 'text-white font-semibold' : 'hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B82F6] rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all duration-200 shadow-sm shadow-[#2563EB]/25 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B82F6]"
            >
              <span>Get a Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-[#0F172A] border-b border-white/10 shadow-xl"
            >
              <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
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
                          ? 'bg-white/10 text-white font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />}
                    </a>
                  );
                })}
                <div className="pt-2 mt-1 border-t border-white/10">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#contact');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                  >
                    <span>Get Your Website Built</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-xs"
          />
        )}
      </AnimatePresence>
    </>
  );
}
