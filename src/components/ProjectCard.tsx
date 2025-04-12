
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Project } from "../types";
import { getStatusColor } from "../lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { id, name, description, status, techStack, githubUrl, deploymentUrl, tasks } = project;
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <div className="gradient-card rounded-lg overflow-hidden animate-fade-in">
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg truncate">{name}</h3>
            <div className={cn("text-xs px-2 py-1 rounded-full inline-block mt-1", getStatusColor(status))}>
              {status.replace('-', ' ')}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 flex-grow">
          {description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {techStack.slice(0, 3).map((tech, index) => (
            <span key={index} className="tag">{tech}</span>
          ))}
          {techStack.length > 3 && (
            <span className="tag">+{techStack.length - 3}</span>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{completedTasks}/{totalTasks} tasks</span>
          </div>
          <div className="h-1 w-full bg-secondary rounded overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex gap-2">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {deploymentUrl && (
              <a 
                href={deploymentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <Link 
            to={`/project/${id}`} 
            className="text-sm text-primary hover:text-primary/90 flex items-center gap-1 transition-colors"
          >
            <span>View details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
