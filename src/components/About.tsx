import { motion } from 'motion/react';
import { BookOpen, Target, ArrowUpRight, Code, Brain } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-[#EAEAEA]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#4169E1] uppercase block mb-2">
            Biography &amp; Focus
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            {PERSONAL_INFO.about.heading}
          </h2>
        </div>

        {/* Two-column layout on desktop, single-column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl font-medium text-[#171717] leading-snug">
                {PERSONAL_INFO.about.paragraphs[0]}
              </p>

              <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
                {PERSONAL_INFO.about.paragraphs[1]}
              </p>

              <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
                {PERSONAL_INFO.about.paragraphs[2]}
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4169E1] hover:text-[#3154b3] transition-colors"
              >
                <span>Explore my projects and technical experiments</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-[#F8F9FA] rounded-2xl border border-[#EAEAEA] p-6 sm:p-7 space-y-6 shadow-xs"
          >
            <div className="border-b border-[#EAEAEA] pb-3">
              <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Profile Summary
              </h3>
              <p className="text-[11px] text-[#777777] mt-0.5">Quick facts &amp; foundational details</p>
            </div>

            <div className="space-y-3.5">
              {PERSONAL_INFO.about.highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-4 py-1.5 border-b border-[#EAEAEA]/80 last:border-0 last:pb-0"
                >
                  <span className="text-xs font-medium text-[#777777]">{item.label}</span>
                  <span className="text-xs font-semibold text-[#171717] text-right">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Core values */}
            <div className="pt-2 space-y-3 border-t border-[#EAEAEA]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center text-[#4169E1] shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#171717]">AI &amp; Creative Tools</h4>
                  <p className="text-[11px] text-[#777777] mt-0.5 leading-relaxed">
                    Experimenting with prompt engineering, AI video synthesis and generative image workflows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center text-[#4169E1] shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#171717]">Frontend Engineering</h4>
                  <p className="text-[11px] text-[#777777] mt-0.5 leading-relaxed">
                    Developing clean, responsive websites using HTML, CSS, modern JavaScript and React.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
