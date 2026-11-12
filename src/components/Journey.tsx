import { motion } from 'motion/react';
import { Compass, Rocket, Check } from 'lucide-react';
import { JOURNEY_DATA } from '../data/portfolioData.ts';

export function Journey() {
  const getTimelineIcon = (status: 'past' | 'present' | 'future') => {
    switch (status) {
      case 'past':
        return <Check className="w-4 h-4 text-[#4169E1]" />;
      case 'present':
        return <Compass className="w-4 h-4 text-[#4169E1]" />;
      case 'future':
        return <Rocket className="w-4 h-4 text-[#4169E1]" />;
    }
  };

  return (
    <section id="journey" className="py-20 md:py-28 bg-[#F8F9FA] border-t border-[#EAEAEA]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 sm:mb-16 text-center mx-auto">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#4169E1] uppercase block mb-2">
            Timeline &amp; Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            Learning Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#777777] leading-relaxed">
            The progression of skills, curiosity, and forward-looking ambitions in technology and digital creation.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central spine line */}
          <div
            className="absolute top-4 bottom-4 left-4 md:left-1/2 -translate-x-1/2 w-[1.5px] bg-[#EAEAEA]"
            aria-hidden="true"
          />

          <div className="space-y-10 sm:space-y-12">
            {JOURNEY_DATA.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-6 md:gap-12 pl-12 md:pl-0`}
                >
                  {/* Timeline node badge */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-8 h-8 rounded-full bg-white border-2 border-[#4169E1] shadow-xs flex items-center justify-center z-10">
                    {getTimelineIcon(milestone.status)}
                  </div>

                  {/* Milestone Card */}
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-xs hover:border-[#4169E1]/35 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-[#4169E1] tracking-wider">
                          {milestone.year}
                        </span>
                        <span className="text-[11px] font-medium text-[#777777] capitalize">
                          {milestone.status === 'present' ? 'Current Focus' : milestone.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#171717] tracking-tight leading-snug">
                        {milestone.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
                        {milestone.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#F8F9FA] flex flex-wrap gap-1.5">
                        {milestone.focus.map((item) => (
                          <span
                            key={item}
                            className="text-[11px] text-[#777777] bg-[#F8F9FA] px-2.5 py-0.5 rounded-md border border-[#EAEAEA]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
