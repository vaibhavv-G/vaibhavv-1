import { motion } from 'motion/react';
import {
  Youtube,
  Instagram,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { PERSONAL_INFO, KEY_METRICS } from '../data/portfolioData.ts';

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0B1120] bg-grid-dark text-white"
    >
      {/* Subtle radial cobalt glow behind the right portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 w-[520px] h-[520px] rounded-full bg-[#2563EB]/15 blur-[120px]"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Direct, Instant-Clarity Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* Clear Identity Kicker */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wider text-[#60A5FA] uppercase">
              <span>Vaibhav Garad</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Website Developer</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400">50+ Businesses Served</span>
            </div>

            {/* Crystal-clear Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.14] text-balance">
              I Build the Best Websites for Your Business at an{' '}
              <span className="text-[#60A5FA]">Affordable Price.</span>
            </h1>

            {/* Concise, Direct Subcopy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Hi, I'm <strong className="text-white font-semibold">Vaibhav Garad</strong>. I have already built modern, mobile-friendly websites for{' '}
              <strong className="text-white font-semibold">50+ businesses</strong> — helping brands grow online without expensive agency fees.
            </p>

            {/* Scannable Guarantee Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-200 max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span>50+ Business Websites Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span>Affordable &amp; Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span>100% Mobile &amp; Speed Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span>Fast Turnaround &amp; Support</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-all duration-200 shadow-lg shadow-[#2563EB]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] focus-visible:ring-[#3B82F6]"
              >
                <span>Get Your Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/8 hover:bg-white/14 border border-white/15 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <span>View Work</span>
              </button>
            </div>

            {/* Social Links & Location */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium mr-1">Connect:</span>
                <a
                  href={PERSONAL_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vaibhav Garad on YouTube (@MiniAiYT)"
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
                  title="YouTube @MiniAiYT"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vaibhav Garad on LinkedIn"
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vaibhav Garad on Instagram"
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Maharashtra, India</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Fixed Vaibhav Garad Portrait (No Upload Controls) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[340px] sm:max-w-[380px]">
              <div className="bg-[#131C31] p-3 rounded-2xl border border-white/12 shadow-2xl shadow-black/50">
                {/* 4:5 portrait container cleanly crops side edges and focuses on Vaibhav */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt="Vaibhav Garad — Website Developer"
                    className="w-full h-full object-cover object-top scale-[1.14]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle bottom contrast scrim for crisp readability */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/40 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between">
                    <div>
                      <p className="font-display font-bold text-base text-white leading-tight">
                        Vaibhav Garad
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Website Developer
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-[#60A5FA] tabular-nums block">
                        50+
                      </span>
                      <span className="text-[11px] text-slate-300 block">
                        Businesses
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Key Proof Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {KEY_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums block">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium block">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
