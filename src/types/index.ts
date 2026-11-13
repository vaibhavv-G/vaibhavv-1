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

export interface ServiceOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  highlight?: boolean;
}
