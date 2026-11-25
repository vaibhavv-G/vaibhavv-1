import { ProjectItem, ServiceOffer } from '../types/index.ts';

export const PERSONAL_INFO = {
  name: 'Vaibhav Garad',
  brand: 'VG',
  location: 'Maharashtra, India',
  role: 'Website Developer',
  tagline: 'Best Websites. Affordable Price.',
  email: 'vgarad75@gmail.com',
  phone: '7385957299',
  phoneFormatted: '+91 73859 57299',
  youtube: 'https://www.youtube.com/@miniaiyt',
  youtubeHandle: '@miniaiyt',
  instagram: 'https://www.instagram.com/vaibhavvv_275?avpt=MWQ0dWZtN3Vja3hscQ==',
  instagramHandle: '@vaibhavvv_275',
  linkedin: 'https://linkedin.com',
  profileImage: '/assets/aistudio/20261109_084618_8b173a0d.jpg',
  businessesServed: '50+',
  heroHeadline: 'I Am a Website Developer.',
  heroSubheadline: 'I Build the Best Websites for Your Business at an Affordable Price.',
  heroDescription:
    'Trusted by 50+ businesses. Fast, mobile-friendly, and modern websites designed to grow your brand online without high agency costs.',
};

export const KEY_METRICS = [
  { value: '50+', label: 'Businesses Served' },
  { value: '100%', label: 'Mobile Responsive' },
  { value: 'Fast', label: 'On-Time Delivery' },
  { value: 'Budget', label: 'Affordable Pricing' },
];

export const SERVICES_OFFERED: ServiceOffer[] = [
  {
    id: 'business-website',
    title: 'Business Website',
    subtitle: 'For shops, startups & local brands',
    description: 'Clean, trustworthy website to bring your business online and attract customers.',
    features: [
      'Mobile & desktop friendly layout',
      'WhatsApp & contact form integration',
      'Fast loading & Google-ready setup',
    ],
  },
  {
    id: 'custom-web-design',
    title: 'Portfolio & Landing Page',
    subtitle: 'Most Popular · Best Value',
    description: 'High-converting modern website tailored to showcase your work, services, or product.',
    features: [
      'Custom modern UI/UX design',
      'Smooth animations & clear branding',
      'Affordable pricing with full support',
    ],
    highlight: true,
  },
  {
    id: 'ai-web-experience',
    title: 'Modern React & AI Site',
    subtitle: 'Interactive & scalable builds',
    description: 'Dynamic React web apps and AI-powered creative websites built with modern code.',
    features: [
      'Built with React, HTML, CSS & JS',
      'AI-enhanced visuals & smart workflows',
      'Clean code & easy future updates',
    ],
  },
];

export const CORE_SKILLS = [
  'React',
  'JavaScript',
  'HTML & CSS',
  'Modern UI Design',
  'Artificial Intelligence',
  'Prompt Engineering',
  'AI Image & Video',
  'Video Editing',
  'Canva',
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'business-websites',
    title: '50+ Business Websites',
    tagline: 'Client Web Development',
    description:
      'Designed and delivered modern, mobile-ready websites for 50+ local and growing businesses at affordable rates.',
    fullDetails:
      'I have helped 50+ businesses establish a professional online presence with fast, clean, and customer-focused websites—covering landing pages, service showcases, and direct inquiry flows.',
    category: 'Business Websites',
    image: '/src/assets/images/project_web_design_1794497950818.jpg',
    highlights: [
      '50+ business websites successfully delivered',
      'Mobile-first responsive layouts for every screen',
      'Affordable packages tailored for business owners',
    ],
    toolsUsed: ['React', 'HTML & CSS', 'JavaScript', 'Responsive UI'],
  },
  {
    id: 'miniaiyt',
    title: 'MiniAiYT (@miniaiyt)',
    tagline: 'AI Content Creation',
    description:
      'My YouTube channel @miniaiyt sharing practical AI tutorials, video workflows, and modern digital tools.',
    fullDetails:
      'MiniAiYT (@miniaiyt) is my creative YouTube channel focused on making artificial intelligence simple and useful through visual guides, video editing, and creative experiments.',
    category: 'YouTube Channel',
    image: '/src/assets/images/project_miniaiyt_1794497950092.jpg',
    link: 'https://www.youtube.com/@miniaiyt',
    highlights: [
      'Practical AI tool walkthroughs',
      'Full video editing & thumbnail design',
      'Growing community on YouTube',
    ],
    toolsUsed: ['YouTube', 'Video Editing', 'AI Video', 'Canva'],
  },
  {
    id: 'ai-creative-experiments',
    title: 'AI Creative Visuals',
    tagline: 'Generative AI Media',
    description:
      'Custom AI image and video generation workflows used to give modern websites standout visual branding.',
    fullDetails:
      'Exploring generative AI image and video tools alongside prompt engineering to produce clean, high-impact visual assets for digital brands and web projects.',
    category: 'AI & Design',
    image: '/src/assets/images/project_ai_experiments_1794497950382.jpg',
    highlights: [
      'High-resolution AI visual creation',
      'Consistent modern brand aesthetics',
      'Fast asset turnaround for web projects',
    ],
    toolsUsed: ['AI Image Generation', 'AI Video Generation', 'Prompt Engineering'],
  },
];
