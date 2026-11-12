import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Youtube,
  Instagram,
  Linkedin,
  ArrowRight,
  Camera,
  MapPin,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { PhotoUploadModal } from './PhotoUploadModal.tsx';

export function Hero() {
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('vg_portfolio_profile_photo');
    } catch {
      return null;
    }
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-white"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typographic Hierarchy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* 1. Small Label */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4169E1]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#4169E1] uppercase">
                {PERSONAL_INFO.heroIntro}
              </span>
            </div>

            {/* 2. Main Heading */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-[1.16] text-balance">
                Hi, I'm Vaibhav.
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717]/90 tracking-tight leading-[1.2] text-balance">
                I Create &amp; Explore Digital Experiences.
              </p>
            </div>

            {/* 3. Tagline */}
            <div className="text-sm sm:text-base font-semibold text-[#4169E1] tracking-tight">
              "{PERSONAL_INFO.tagline}"
            </div>

            {/* 4. Description */}
            <p className="text-sm sm:text-base md:text-[17px] text-[#777777] leading-relaxed max-w-xl">
              {PERSONAL_INFO.heroDescription}
            </p>

            {/* 5. Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#4169E1] hover:bg-[#3154b3] rounded-xl transition-all duration-200 shadow-xs hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4169E1]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('about')}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#171717] bg-[#F8F9FA] hover:bg-[#EAEAEA] border border-[#EAEAEA] rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4169E1]"
              >
                <span>About Me</span>
              </button>
            </div>

            {/* 6. Social Links and Location indicator */}
            <div className="pt-4 border-t border-[#EAEAEA] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs text-[#777777] font-medium mr-1.5">Connect:</span>
                <a
                  href={PERSONAL_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vaibhav Garad on YouTube (@MiniAiYT)"
                  className="p-2 sm:p-2.5 rounded-lg text-[#777777] hover:text-[#FF0000] hover:bg-[#F8F9FA] border border-transparent hover:border-[#EAEAEA] transition-all"
                  title="YouTube @MiniAiYT"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vaibhav Garad on LinkedIn"
                  className="p-2 sm:p-2.5 rounded-lg text-[#777777] hover:text-[#0077B5] hover:bg-[#F8F9FA] border border-transparent hover:border-[#EAEAEA] transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vaibhav Garad on Instagram"
                  className="p-2 sm:p-2.5 rounded-lg text-[#777777] hover:text-[#E4405F] hover:bg-[#F8F9FA] border border-transparent hover:border-[#EAEAEA] transition-all"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#777777] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#4169E1]" />
                <span>Maharashtra, India</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Profile Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-xs sm:max-w-sm">
              <div className="bg-[#F8F9FA] p-3 sm:p-3.5 rounded-2xl border border-[#EAEAEA] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group">
                {/* Photo container */}
                <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-white border border-[#EAEAEA] flex items-center justify-center">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Vaibhav Garad"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Minimalist Personal Identity Frame preserving original identity */
                    <div className="w-full h-full p-6 sm:p-7 flex flex-col items-center justify-between text-center bg-gradient-to-b from-white via-white to-[#F8F9FA]">
                      <div className="w-full flex justify-between items-center text-xs text-[#777777]">
                        <span className="font-mono text-[10px] tracking-wider text-[#4169E1]">
                          PORTFOLIO // ID
                        </span>
                        <span className="text-[11px] font-medium">Maharashtra, IN</span>
                      </div>

                      <div className="my-auto flex flex-col items-center py-4">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#171717] text-white flex items-center justify-center shadow-md mb-3.5 border-2 border-white">
                          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">VG</span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-[#171717]">Vaibhav Garad</h2>
                        <p className="text-xs text-[#777777] mt-1 max-w-[220px] leading-relaxed">
                          Student · AI Enthusiast · Aspiring Web Developer
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPhotoModalOpen(true)}
                        className="w-full py-2 px-3 rounded-lg bg-white border border-[#EAEAEA] hover:border-[#4169E1] text-[#171717] hover:text-[#4169E1] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#4169E1]" />
                        <span>Upload Profile Photograph</span>
                      </button>
                    </div>
                  )}

                  {/* Photo Edit Hover overlay if photo is present */}
                  {profilePhoto && (
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                      <button
                        type="button"
                        onClick={() => setPhotoModalOpen(true)}
                        className="px-3.5 py-2 rounded-lg bg-white text-[#171717] text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-[#F8F9FA] transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#4169E1]" />
                        <span>Update Photograph</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtitle meta under profile photo */}
                <div className="mt-3 px-1.5 py-0.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#171717] block text-xs">Vaibhav Garad</span>
                    <span className="text-[11px] text-[#777777]">Brand: VG</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#4169E1] font-semibold block">Tech Explorer</span>
                    <span className="text-[10px] text-[#777777]">2026 Edition</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight strip below hero */}
        <div className="mt-14 pt-8 border-t border-[#EAEAEA] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-[#777777] block font-medium">Role</span>
            <span className="text-sm font-semibold text-[#171717] block">Student &amp; Web Developer</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#777777] block font-medium">Location</span>
            <span className="text-sm font-semibold text-[#171717] block">Maharashtra, India</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#777777] block font-medium">Content Channel</span>
            <a
              href={PERSONAL_INFO.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#4169E1] hover:underline inline-flex items-center gap-1"
            >
              <span>MiniAiYT</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#777777] block font-medium">Core Tagline</span>
            <span className="text-sm font-semibold text-[#171717] block">Learning Today. Creating Tomorrow.</span>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      <PhotoUploadModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        currentPhoto={profilePhoto}
        onPhotoUpdated={(newPhoto) => setProfilePhoto(newPhoto)}
      />
    </section>
  );
}
