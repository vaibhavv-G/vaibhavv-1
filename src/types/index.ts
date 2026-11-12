export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDetails: string;
  category: string;
  image: string;
  link?: string;
  highlights: string[];
  toolsUsed: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  items: {
    name: string;
    description: string;
    category: string;
  }[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  status: 'past' | 'present' | 'future';
  focus: string[];
}
