import { ProjectItem, SkillCategory, JourneyMilestone } from '../types/index.ts';

export const PERSONAL_INFO = {
  name: 'Vaibhav Garad',
  brand: 'VG',
  location: 'Maharashtra, India',
  role: 'Student | AI Enthusiast | Aspiring Web Developer',
  tagline: 'Learning Today. Creating Tomorrow.',
  email: 'vgarad75@gmail.com',
  phone: '7385957299',
  phoneFormatted: '+91 73859 57299',
  youtube: 'https://www.youtube.com/@MiniAiYT',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  heroIntro: "HELLO, I'M VAIBHAV GARAD.",
  heroHeadline: "Hi, I'm Vaibhav. I Create & Explore Digital Experiences.",
  heroDescription:
    "I'm a student passionate about Artificial Intelligence, Website Development, Technology and Digital Creativity.",
  about: {
    heading: 'About Me',
    paragraphs: [
      "I'm Vaibhav Garad from Maharashtra, India.",
      "I'm a student interested in artificial intelligence, website development, modern technology and digital creativity.",
      "I enjoy learning new technologies, experimenting with AI tools and building creative digital projects.",
    ],
    highlights: [
      { label: 'Location', value: 'Maharashtra, India' },
      { label: 'Role', value: 'Student | Tech Explorer' },
      { label: 'Interests', value: 'AI, Web Development & Creativity' },
      { label: 'Philosophy', value: 'Learn, Experiment, Build' },
    ],
  },
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Core Web Development',
    description: 'Foundations and frameworks for responsive, interactive websites',
    items: [
      { name: 'HTML', description: 'Semantic structure, modern layouts & accessible web standards', category: 'Frontend' },
      { name: 'CSS', description: 'Responsive layouts, modern styling systems, Flexbox & Grid', category: 'Frontend' },
      { name: 'JavaScript', description: 'Core ES6+ logic, DOM interaction & modern web fundamentals', category: 'Language' },
      { name: 'React', description: 'Component-driven user interfaces, state management & hooks', category: 'Framework' },
    ],
  },
  {
    title: 'Artificial Intelligence & Prompting',
    description: 'Exploring machine intelligence and cognitive workflow optimization',
    items: [
      { name: 'Artificial Intelligence', description: 'Concepts, emerging models & digital productivity applications', category: 'AI' },
      { name: 'Prompt Engineering', description: 'Crafting structured, high-context prompts for generative AI models', category: 'AI' },
      { name: 'AI Image Generation', description: 'Generative image generation, composition styles & visual synthesis', category: 'AI Media' },
      { name: 'AI Video Generation', description: 'AI video generation tools, motion prompting & storytelling', category: 'AI Media' },
    ],
  },
  {
    title: 'Creative Media & Content',
    description: 'Tools for visual branding, storytelling, and digital publishing',
    items: [
      { name: 'Video Editing', description: 'Timeline pacing, audio syncing, color touchups & YouTube production', category: 'Production' },
      { name: 'Canva', description: 'Visual design, YouTube thumbnails, branding layouts & social media graphics', category: 'Design' },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'miniaiyt',
    title: 'MiniAiYT',
    tagline: 'AI Content Creation',
    description:
      'AI Content Creation exploring practical tutorials, generative workflows, and creative tech experimentation.',
    fullDetails:
      'MiniAiYT is my creative YouTube content channel dedicated to artificial intelligence. I create step-by-step video tutorials exploring generative AI tools, prompt engineering, and visual storytelling, handling everything from video ideation and editing to custom thumbnail creation.',
    category: 'AI Content Creation',
    image: '/src/assets/images/project_miniaiyt_1794497950092.jpg',
    link: 'https://www.youtube.com/@MiniAiYT',
    highlights: [
      'Original video tutorials on emerging AI tools & workflows',
      'End-to-end video editing and thumbnail creation',
      'Community engagement around practical AI workflows',
    ],
    toolsUsed: ['YouTube', 'Video Editing', 'AI Video Generation', 'Canva'],
  },
  {
    id: 'ai-creative-experiments',
    title: 'AI Creative Experiments',
    tagline: 'Generative AI & Motion',
    description:
      'Exploring AI image and video generation to discover novel visual styles, prompt techniques, and digital storytelling workflows.',
    fullDetails:
      'An exploratory initiative focused on testing and documenting state-of-the-art generative AI tools. Through systematic prompt experimentation, multi-model testing, and style exploration, I study how AI image and video models can be harnessed for high-aesthetic creative media.',
    category: 'Generative AI',
    image: '/src/assets/images/project_ai_experiments_1794497950382.jpg',
    highlights: [
      'Systematic prompt design for consistent aesthetics',
      'Multi-modal image and video synthesis experiments',
      'Documenting practical creative workflows',
    ],
    toolsUsed: ['AI Image Generation', 'AI Video Generation', 'Prompt Engineering'],
  },
  {
    id: 'website-development-projects',
    title: 'Website Development Projects',
    tagline: 'Web Design & Development',
    description:
      'Personal website design and development experiments exploring modern frontend frameworks, responsive layouts, and clean UI.',
    fullDetails:
      'Hands-on exploration of contemporary frontend web technologies including React, TypeScript, and modern CSS. The focus is on crafting lightweight, accessible web interfaces with elegant typography hierarchy, smooth micro-interactions, and thoughtful responsive layouts.',
    category: 'Web Development',
    image: '/src/assets/images/project_web_design_1794497950818.jpg',
    highlights: [
      'Clean component architecture with React and TypeScript',
      'Responsive mobile-first layouts with zero-clutter aesthetics',
      'Smooth performance with accessible semantic HTML',
    ],
    toolsUsed: ['React', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'],
  },
];

export const JOURNEY_DATA: JourneyMilestone[] = [
  {
    year: '2025',
    title: 'Started exploring AI and digital content creation.',
    description:
      'Began exploring artificial intelligence tools, generative prompt techniques, and initiated digital content creation on YouTube with MiniAiYT.',
    status: 'past',
    focus: ['AI Exploration', 'Content Creation', 'Generative Prompts'],
  },
  {
    year: '2026',
    title: 'Learning web development and modern technologies.',
    description:
      'Actively learning web development (HTML, CSS, JavaScript, React) and modern technologies to build responsive, interactive digital experiences.',
    status: 'present',
    focus: ['Web Development', 'React & JavaScript', 'Modern Tech'],
  },
  {
    year: 'Future',
    title: 'Building innovative digital projects and improving technical skills.',
    description:
      'Committed to building innovative digital projects, mastering advanced software engineering skills, and pursuing technology entrepreneurship.',
    status: 'future',
    focus: ['Innovative Projects', 'Advanced Engineering', 'Tech Entrepreneurship'],
  },
];
