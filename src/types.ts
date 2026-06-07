export interface Skill {
  name: string;
  category: 'programming' | 'web' | 'database' | 'design';
  level: number; // 0 - 100
  iconName: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  visualType: 'detection' | 'summarizer' | 'arcade';
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}
