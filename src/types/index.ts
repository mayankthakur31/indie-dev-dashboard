
export type Project = {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  techStack: string[];
  githubUrl?: string;
  deploymentUrl?: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
};

export type TechTag = {
  id: string;
  name: string;
  color?: string;
};
