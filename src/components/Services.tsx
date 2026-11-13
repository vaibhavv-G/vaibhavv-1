import { motion } from 'motion/react';
import { Check, ArrowRight, Globe, Laptop, Sparkles } from 'lucide-react';
import { SERVICES_OFFERED, CORE_SKILLS } from '../data/portfolioData.ts';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  const getIcon = (id: string, highlight?: boolean) => {
    const colorClass = highlight ? 'text-[#60A5FA]' : 'text-[#2563EB]';
    switch (id) {
      case 'business-website':
        return <Globe className={`w-5 h-5 ${colorClass}`} />;
      case 'custom-web-design':
        return <Laptop className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  const handleChoose = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 md:py-24 bg-white bg-grid-light border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Crisp Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-widest text-[#2563EB] uppercase block mb-2">
              What I Build For You
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
              Quality Websites at Affordable Prices
            </h2>
          </div>
          <p className="text-sm text-[#64748B] max-w-sm">
            Trusted by 50+ businesses. Pick what fits your business and let's launch fast.
          </p>
        </div>

        {/* 3 Clean Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_OFFERED.map((service, index) => {
            const isHighlighted = Boolean(service.highlight);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-[#0B1120] text-white border border-[#1E293B] shadow-xl shadow-slate-900/10'
                    : 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isHighlighted
                          ? 'bg-white/10 border border-white/10'
                          : 'bg-[#F8FAFC] border border-[#E2E8F0]'
                      }`}
                    >
                      {getIcon(service.id, isHighlighted)}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isHighlighted ? 'text-[#60A5FA]' : 'text-[#64748B]'
                      }`}
                    >
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isHighlighted ? 'text-slate-300' : 'text-[#64748B]'
                    }`}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 pt-5 border-t border-current/10">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isHighlighted ? 'text-[#60A5FA]' : 'text-[#2563EB]'
                          }`}
                        />
                        <span className={isHighlighted ? 'text-slate-200' : 'text-[#334155]'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-2">
                  <button
                    type="button"
                    onClick={() => handleChoose(service.title)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isHighlighted
                        ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm'
                        : 'bg-[#F8FAFC] hover:bg-[#0B1120] text-[#0F172A] hover:text-white border border-[#E2E8F0]'
                    }`}
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Core Skills & Tools Strip (Concise, zero bloat) */}
        <div className="mt-14 pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] shrink-0">
            Tools &amp; Technologies
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-[#0F172A]">
            {CORE_SKILLS.map((skill, idx) => (
              <span key={skill} className="flex items-center gap-5">
                <span>{skill}</span>
                {idx < CORE_SKILLS.length - 1 && (
                  <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
