import { motion } from 'motion/react';
import {
  Code2,
  Sparkles,
  FileCode,
  Layers,
  Video,
  Cpu,
  Brain,
  Wand2,
  Brush,
  Film,
} from 'lucide-react';

interface SkillItem {
  name: string;
  category: string;
  description: string;
  icon: typeof Code2;
}

const ALL_SKILLS: SkillItem[] = [
  {
    name: 'Artificial Intelligence',
    category: 'AI Concepts',
    description: 'Foundations of AI models, neural applications, and practical tools.',
    icon: Brain,
  },
  {
    name: 'Prompt Engineering',
    category: 'AI Context',
    description: 'Crafting structured, high-context prompts for generative AI models.',
    icon: Sparkles,
  },
  {
    name: 'HTML',
    category: 'Web Core',
    description: 'Semantic markup, accessible structure, and clean web architecture.',
    icon: FileCode,
  },
  {
    name: 'CSS',
    category: 'Styling',
    description: 'Responsive styling, modern CSS Grid, Flexbox, and Tailwind CSS.',
    icon: Layers,
  },
  {
    name: 'JavaScript',
    category: 'Programming',
    description: 'Modern ES6+ syntax, DOM manipulation, asynchronous logic, and APIs.',
    icon: Code2,
  },
  {
    name: 'React',
    category: 'UI Framework',
    description: 'Reusable component architecture, state management, and modern hooks.',
    icon: Cpu,
  },
  {
    name: 'AI Image Generation',
    category: 'Generative Media',
    description: 'Prompt design for high-aesthetic image generation and visual styles.',
    icon: Wand2,
  },
  {
    name: 'AI Video Generation',
    category: 'Generative Media',
    description: 'AI video generation tools, motion dynamics, and creative prompting.',
    icon: Film,
  },
  {
    name: 'Video Editing',
    category: 'Content Creation',
    description: 'Pacing, cut sequencing, audio balance, and YouTube production workflows.',
    icon: Video,
  },
  {
    name: 'Canva',
    category: 'Visual Design',
    description: 'Graphic design, YouTube thumbnails, layouts, and brand visual assets.',
    icon: Brush,
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-[#F8F9FA] border-t border-[#EAEAEA]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#4169E1] uppercase block mb-2">
            Technical Toolset &amp; Studies
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            Skills &amp; Learning Interests
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#777777] leading-relaxed">
            Active areas of study, ongoing experimentation, and practical digital skills without fabricated proficiency percentages.
          </p>
        </div>

        {/* Minimalist Grid of Consistent Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ALL_SKILLS.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white rounded-xl border border-[#EAEAEA] p-5 flex flex-col justify-between hover:border-[#4169E1]/50 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#F8F9FA] border border-[#EAEAEA] flex items-center justify-center text-[#4169E1] mb-3.5 group-hover:bg-[#4169E1]/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="text-sm font-bold text-[#171717] tracking-tight group-hover:text-[#4169E1] transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-[#777777] mt-1.5 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F8F9FA] flex items-center justify-between text-[11px] text-[#777777]">
                  <span className="font-medium text-[#777777]">{skill.category}</span>
                  <span className="text-[#4169E1] text-[10px] font-semibold">Active</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
