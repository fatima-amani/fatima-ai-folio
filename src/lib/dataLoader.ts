// Data loader utility to handle separate JSON files
import portfolioData from '../data/portfolio.json';
import experiencesData from '../data/experiences.json';
import projectsData from '../data/projects.json';
import certificationsData from '../data/certifications.json';

export interface PortfolioData {
  personal: {
    name: string;
    firstname: string;
    title: string;
    subtitle: string;
    location: string;
    email: string;
    taglines: string[];
    social: {
      github: string;
      linkedin: string;
      credly: string;
      email: string;
    };
    resume: string;
  };
  funFacts: string[];
  about: {
    intro: string;
    education: string;
  };
  skills: {
    programming_languages: string[];
    frontend_technologies: string[];
    frontend_libraries: string[];
    backend_frameworks: string[];
    backend_architectures: string[];
    databases: string[];
    ai_frameworks_and_tools: string[];
    devops_and_cloud_tools: string[];
    cloud: string[];
    ide_editors: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    achievements?: string[];
    highlights?: string[];
    images?: Array<{
      name: string;
      path: string;
      description?: string;
    }>;
  }>;
  projects: Array<{
    title: string;
    tech_stack: string[];
    description: string;
    github?: string | Record<string, string>;
    demo?: string;
    highlights?: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    board: string;
    cgpa?: string;
    percentage?: string;
    timeline: string;
    relevant_coursework?: string[];
    stream?: string;
  }>;
  certifications: Array<{
    name: string;
    provider: string;
    skills: string[];
    image?: string;
    credential?: string;
    verify_cred_link?: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    year: string;
  }>;
  leadership: Array<{
    role: string;
    organization: string;
    duration: string | null;
    responsibilities: string[];
    images: any[];
  }>;
  hobbies: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
}

export const loadPortfolioData = (): PortfolioData => {
  return {
    ...portfolioData,
    experience: experiencesData.experiences,
    projects: projectsData.projects,
    certifications: certificationsData.certifications,
  };
};
