export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  year: number;
  featured?: boolean;
  imageUrl?: string;
  challenges?: string[];
  solutions?: string[];
  architecture?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'database' | 'other';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
  readTime?: string;
}

export interface PortfolioData {
  owner: {
    name: string;
    // Optional alternate display name for the Hero section
    heroName?: string;
    role: string;
    location?: string;
    summary: string;
    bio?: string;
    avatarUrl?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  projects: Project[];
  skills?: Skill[];
  experiences?: Experience[];
  blogs?: BlogPost[];
}
