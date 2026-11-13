import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ExternalLink, X, CheckCircle } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData.ts';
import { ProjectItem } from '../types/index.ts';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-widest text-[#2563EB] uppercase block mb-2">
              Proven Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
              Work &amp; Digital Projects
            </h2>
          </div>
          <p className="text-sm text-[#64748B]">
            50+ business websites built · YouTube &amp; AI visuals
          </p>
        </div>

        {/* 3-Column Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col justify-between hover:border-[#2563EB]/40 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300"
            >
              {/* Preview Image */}
              <div
                className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#2563EB] font-semibold mb-2">
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                    <span className="text-[#64748B] font-medium">{project.tagline}</span>
                  </div>

                  <h3
                    className="text-lg font-bold text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                    >
                      <span>Visit Channel</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                    >
                      <span>View Highlights</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs text-[#64748B] hover:text-[#0F172A] font-medium transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl max-w-xl w-full border border-[#E2E8F0] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-[#2563EB]">{selectedProject.category}</span>
                  <span className="text-[#CBD5E1]">·</span>
                  <span className="text-[#64748B]">{selectedProject.tagline}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                  className="p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-[#F8FAFC] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div className="rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 border border-[#E2E8F0]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">{selectedProject.title}</h3>
                  <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                    {selectedProject.fullDetails}
                  </p>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="text-xs text-[#334155] flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A]"
                >
                  Close
                </button>
                {selectedProject.link ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                  >
                    <span>Open YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                  >
                    <span>Build Similar Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
