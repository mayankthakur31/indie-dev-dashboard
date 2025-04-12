
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Edit2, 
  ExternalLink, 
  Github,
  Save
} from "lucide-react";
import { format } from "date-fns";
import { Project } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "./TaskList";
import TagInput from "./ui/TagInput";
import { techTags } from "../lib/data";
import { toast } from "sonner";

interface ProjectDetailProps {
  projects: Project[];
}

const ProjectDetail = ({ projects }: ProjectDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(project => project.id === id);

  // If project is not found
  if (!project) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <p className="text-muted-foreground mt-2">The project you're looking for doesn't exist</p>
        <Link to="/dashboard" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    githubUrl: project.githubUrl || "",
    deploymentUrl: project.deploymentUrl || "",
  });
  const [techStack, setTechStack] = useState<string[]>(project.techStack);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as Project["status"] });
  };

  const handleSave = () => {
    // In a real app, this would update the project in the database
    setIsEditing(false);
    toast.success("Project updated successfully");
  };

  const availableTechTags = techTags.map(tag => tag.name);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          <span>Back to Projects</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 size={16} className="mr-2" />
              Edit Project
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Project title and description */}
          <div className="gradient-card p-6 rounded-lg space-y-6">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Project Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select 
                    value={formData.status} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1 className="text-2xl font-semibold">{project.name}</h1>
                  <div className="mt-2 text-sm bg-secondary/50 text-secondary-foreground py-1 px-3 rounded-full w-fit">
                    {project.status.replace('-', ' ')}
                  </div>
                </div>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="text-sm text-muted-foreground">
                  <p>Created: {format(project.createdAt, "MMM d, yyyy")}</p>
                  <p>Last updated: {format(project.updatedAt, "MMM d, yyyy")}</p>
                </div>
              </>
            )}
          </div>
          
          {/* Tabs for Tasks and other content */}
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="gradient-card p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Task List</h3>
              <TaskList tasks={project.tasks} projectId={project.id} />
            </TabsContent>
            
            <TabsContent value="links" className="gradient-card p-6 rounded-lg space-y-6">
              <h3 className="text-lg font-medium mb-4">Project Links</h3>
              
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <label htmlFor="githubUrl" className="text-sm font-medium flex items-center gap-2">
                      <Github size={16} />
                      GitHub Repository URL
                    </label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="deploymentUrl" className="text-sm font-medium flex items-center gap-2">
                      <ExternalLink size={16} />
                      Deployment URL
                    </label>
                    <Input
                      id="deploymentUrl"
                      name="deploymentUrl"
                      value={formData.deploymentUrl}
                      onChange={handleInputChange}
                      placeholder="https://your-project.com"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Github size={16} />
                      GitHub Repository
                    </div>
                    {project.githubUrl ? (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/90 text-sm flex items-center gap-1"
                      >
                        {project.githubUrl}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">No GitHub repository linked</p>
                    )}
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium flex items-center gap-2 mb-2">
                      <ExternalLink size={16} />
                      Deployment URL
                    </div>
                    {project.deploymentUrl ? (
                      <a 
                        href={project.deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/90 text-sm flex items-center gap-1"
                      >
                        {project.deploymentUrl}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">No deployment link available</p>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activity" className="gradient-card p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Activity Feed</h3>
              <div className="text-center py-16">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-4 text-muted-foreground">Activity tracking coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar for tech stack and other metadata */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <div className="gradient-card p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Tech Stack</h3>
            {isEditing ? (
              <div className="space-y-4">
                <TagInput
                  tags={techStack}
                  setTags={setTechStack}
                  availableTags={availableTechTags}
                  placeholder="Add technology..."
                />
                <p className="text-xs text-muted-foreground">
                  Press enter to add a custom tech or select from suggestions
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {project.techStack.length > 0 ? (
                  project.techStack.map((tech, index) => (
                    <span key={index} className="tag">
                      {tech}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No technologies specified</p>
                )}
              </div>
            )}
          </div>
          
          {/* Additional info */}
          <div className="gradient-card p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Tasks Overview</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Completed:</span>
                  <span className="font-mono">
                    {project.tasks.filter(task => task.completed).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending:</span>
                  <span className="font-mono">
                    {project.tasks.filter(task => !task.completed).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total:</span>
                  <span className="font-mono">{project.tasks.length}</span>
                </div>
              </div>
              
              <div className="py-2 mt-2 border-t border-border">
                <div className="text-sm font-medium mb-2">Progress</div>
                <div className="h-2 w-full bg-secondary rounded overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ 
                      width: `${project.tasks.length > 0 
                        ? (project.tasks.filter(task => task.completed).length / project.tasks.length) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming due dates */}
          <div className="gradient-card p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Upcoming Due Dates</h3>
            <div className="space-y-3">
              {project.tasks
                .filter(task => task.dueDate && !task.completed)
                .sort((a, b) => {
                  if (!a.dueDate || !b.dueDate) return 0;
                  return a.dueDate.getTime() - b.dueDate.getTime();
                })
                .slice(0, 3)
                .map(task => (
                  <div key={task.id} className="p-2 bg-secondary/40 rounded text-sm">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {task.dueDate ? format(task.dueDate, "MMM d, yyyy") : "No due date"}
                    </div>
                  </div>
                ))}
              
              {project.tasks.filter(task => task.dueDate && !task.completed).length === 0 && (
                <p className="text-sm text-muted-foreground">No upcoming due dates</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
