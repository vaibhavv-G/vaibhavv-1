import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ExternalLink, X, CheckCircle, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData.ts';
import { ProjectItem } from '../types/index.ts';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 bg-white border-t border-[#EAEAEA]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-14 gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#4169E1] uppercase block mb-2">
              Featured Work &amp; Explorations
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
              Project Showcase
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#777777] leading-relaxed">
              Real projects and ongoing exploratory initiatives across AI content creation, generative media, and web development.
            </p>
          </div>

          <div className="text-xs text-[#777777] hidden sm:block">
            <span>3 Featured Projects</span>
          </div>
        </div>

        {/* Projects Grid */}
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
              className="group bg-[#F8F9FA] rounded-2xl border border-[#EAEAEA] overflow-hidden flex flex-col justify-between hover:border-[#4169E1]/40 hover:shadow-md transition-all duration-300"
            >
              {/* Media Preview Container with consistent 16:10 ratio */}
              <div
                className="relative aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-white text-[#171717] rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5">
                    View Project Details
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed category with separator */}
                  <div className="flex items-center gap-2 text-xs text-[#4169E1] font-medium mb-2.5">
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="text-[#EAEAEA]">·</span>
                    <span className="text-[#777777]">{project.tagline}</span>
                  </div>

                  <h3
                    className="text-lg font-bold text-[#171717] tracking-tight group-hover:text-[#4169E1] transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Footer action link */}
                <div className="mt-6 pt-4 border-t border-[#EAEAEA] flex items-center justify-between">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4169E1] hover:text-[#3154b3] transition-colors"
                      aria-label={`View YouTube channel for ${project.title}`}
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#171717] hover:text-[#4169E1] transition-colors"
                    >
                      <span>Explore Overview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs text-[#777777] hover:text-[#171717] font-medium transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl max-w-2xl w-full border border-[#EAEAEA] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#4169E1]">
                    {selectedProject.category}
                  </span>
                  <span className="text-[#EAEAEA]">·</span>
                  <span className="text-xs text-[#777777]">{selectedProject.tagline}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                  className="p-1.5 text-[#777777] hover:text-[#171717] rounded-lg hover:bg-[#F8F9FA] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 border border-[#EAEAEA]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
                    {selectedProject.fullDetails}
                  </p>
                </div>

                {/* Highlights */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#EAEAEA] space-y-2.5">
                  <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Project Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-[#171717]/85 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#4169E1] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
                    Technologies &amp; Tools
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#777777]">
                    {selectedProject.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="bg-[#F8F9FA] px-2.5 py-1 rounded-md border border-[#EAEAEA] text-[#171717] text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#EAEAEA] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-medium text-[#777777] hover:text-[#171717] transition-colors"
                >
                  Close
                </button>

                {selectedProject.link ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#4169E1] hover:bg-[#3154b3] rounded-lg transition-colors shadow-xs"
                  >
                    <span>Open YouTube Channel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-[#777777]">Active ongoing project</span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
