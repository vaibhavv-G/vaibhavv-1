import { ArrowUp, Youtube, Instagram, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#EAEAEA] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#EAEAEA]">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#171717] text-white flex items-center justify-center font-bold text-xs tracking-wider">
                VG
              </span>
              <span className="font-bold text-base text-[#171717] tracking-tight">
                VG — Vaibhav Garad
              </span>
            </div>
            <p className="text-xs text-[#777777] font-medium tracking-wide">
              Learning. Creating. Growing.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube channel @MiniAiYT"
              className="p-2 text-[#777777] hover:text-[#FF0000] hover:bg-[#F8F9FA] rounded-lg transition-colors border border-transparent hover:border-[#EAEAEA]"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 text-[#777777] hover:text-[#0077B5] hover:bg-[#F8F9FA] rounded-lg transition-colors border border-transparent hover:border-[#EAEAEA]"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="p-2 text-[#777777] hover:text-[#E4405F] hover:bg-[#F8F9FA] rounded-lg transition-colors border border-transparent hover:border-[#EAEAEA]"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#171717] hover:text-[#4169E1] bg-[#F8F9FA] hover:bg-[#EAEAEA] border border-[#EAEAEA] rounded-lg transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] gap-3">
          <p>© 2026 Vaibhav Garad. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Maharashtra, India</span>
            <span>·</span>
            <span>Personal Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
