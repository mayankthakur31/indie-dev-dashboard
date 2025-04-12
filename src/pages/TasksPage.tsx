
import React, { useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { sampleProjects } from "../lib/data";
import { Task } from "../types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

const TasksPage = () => {
  // Get all tasks from all projects
  const allTasks = sampleProjects.flatMap(project => {
    return project.tasks.map(task => ({
      ...task,
      projectName: sampleProjects.find(p => p.id === task.projectId)?.name || ""
    }));
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tasks, setTasks] = useState(allTasks);
  
  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task status updated");
  };
  
  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "completed" && task.completed) || 
      (statusFilter === "pending" && !task.completed);
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort tasks by due date (if available) and completion status
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    
    if (a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime();
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    return 0;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track all your tasks across projects
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 gradient-card rounded-lg flex items-start gap-4"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleTask(task.id)}
                className={task.completed ? "bg-primary border-primary" : ""}
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {task.projectName}
                  </span>
                </div>
                {task.dueDate && (
                  <p className={`text-xs mt-1 ${
                    task.dueDate < new Date() && !task.completed 
                      ? "text-destructive" 
                      : "text-muted-foreground"
                  }`}>
                    Due: {format(task.dueDate, "MMM d, yyyy")}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No tasks found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
