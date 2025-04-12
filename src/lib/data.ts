
import { Project, Task, TechTag } from '../types';

export const techTags: TechTag[] = [
  { id: '1', name: 'React', color: '#61dafb' },
  { id: '2', name: 'Next.js', color: '#000000' },
  { id: '3', name: 'TypeScript', color: '#3178c6' },
  { id: '4', name: 'Tailwind CSS', color: '#06b6d4' },
  { id: '5', name: 'Node.js', color: '#339933' },
  { id: '6', name: 'Express', color: '#000000' },
  { id: '7', name: 'Supabase', color: '#3ecf8e' },
  { id: '8', name: 'PostgreSQL', color: '#336791' },
  { id: '9', name: 'Firebase', color: '#ffca28' },
  { id: '10', name: 'Vercel', color: '#000000' },
  { id: '11', name: 'Redux', color: '#764abc' },
  { id: '12', name: 'GraphQL', color: '#e535ab' },
  { id: '13', name: 'Prisma', color: '#2d3748' },
  { id: '14', name: 'Docker', color: '#2496ed' },
  { id: '15', name: 'AWS', color: '#ff9900' },
];

// Helper to generate tasks for a project
const generateTasks = (projectId: string): Task[] => {
  const now = new Date();
  return [
    {
      id: `${projectId}-task1`,
      projectId,
      title: 'Setup project repository',
      completed: true,
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: `${projectId}-task2`,
      projectId,
      title: 'Design database schema',
      completed: true,
      createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000)
    },
    {
      id: `${projectId}-task3`,
      projectId,
      title: 'Implement authentication',
      completed: false,
      dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: `${projectId}-task4`,
      projectId,
      title: 'Create responsive UI components',
      completed: false,
      dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)
    },
    {
      id: `${projectId}-task5`,
      projectId,
      title: 'Deploy to production',
      completed: false,
      dueDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    }
  ];
};

export const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'SaaS Landing Page',
    description: 'A landing page for a SaaS product with authentication and payment integration.',
    status: 'in-progress',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    githubUrl: 'https://github.com/username/saas-landing',
    deploymentUrl: 'https://saas-landing.vercel.app',
    tasks: generateTasks('1'),
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2023, 1, 20)
  },
  {
    id: '2',
    name: 'Task Management API',
    description: 'RESTful API for task management with authentication and permissions.',
    status: 'planning',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/username/task-api',
    tasks: generateTasks('2'),
    createdAt: new Date(2023, 1, 5),
    updatedAt: new Date(2023, 1, 10)
  },
  {
    id: '3',
    name: 'E-commerce Mobile App',
    description: 'A cross-platform e-commerce mobile app with product catalog and shopping cart.',
    status: 'completed',
    techStack: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    githubUrl: 'https://github.com/username/ecommerce-app',
    deploymentUrl: 'https://play.google.com/store/apps/details?id=com.example.app',
    tasks: generateTasks('3'),
    createdAt: new Date(2022, 10, 1),
    updatedAt: new Date(2023, 0, 30)
  },
  {
    id: '4',
    name: 'Portfolio Website',
    description: 'Personal portfolio website showcasing projects and skills.',
    status: 'on-hold',
    techStack: ['React', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/username/portfolio',
    deploymentUrl: 'https://portfolio.vercel.app',
    tasks: generateTasks('4'),
    createdAt: new Date(2022, 8, 15),
    updatedAt: new Date(2022, 9, 5)
  },
  {
    id: '5',
    name: 'Blog Platform',
    description: 'A platform for publishing and managing blog content with user authentication.',
    status: 'in-progress',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    githubUrl: 'https://github.com/username/blog-platform',
    tasks: generateTasks('5'),
    createdAt: new Date(2023, 2, 1),
    updatedAt: new Date(2023, 2, 15)
  }
];

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'planning':
      return 'bg-yellow-500/20 text-yellow-300';
    case 'in-progress':
      return 'bg-blue-500/20 text-blue-300';
    case 'completed':
      return 'bg-green-500/20 text-green-300';
    case 'on-hold':
      return 'bg-gray-500/20 text-gray-300';
    default:
      return 'bg-gray-500/20 text-gray-300';
  }
};

export const getRandomColor = (): string => {
  const colors = ['#ff5f56', '#ffbd2e', '#27c93f', '#61dafb', '#764abc', '#e535ab'];
  return colors[Math.floor(Math.random() * colors.length)];
};
