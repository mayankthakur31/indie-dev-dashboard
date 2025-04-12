
import React, { useState } from "react";
import { format } from "date-fns";
import { Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "../types";
import { toast } from "sonner";

interface TaskListProps {
  tasks: Task[];
  projectId: string;
}

const TaskList = ({ tasks: initialTasks, projectId }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    // In a real app, this would update the task in the database
    toast.success("Task status updated");
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    // In a real app, this would delete the task from the database
    toast.success("Task deleted");
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId,
      title: newTaskTitle,
      completed: false,
      createdAt: new Date(),
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    
    // In a real app, this would add the task to the database
    toast.success("Task added");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          className="flex-1"
        />
        <Button size="sm" onClick={handleAddTask}>
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </div>
      
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-secondary/40 rounded-md flex items-center justify-between gap-2 group"
            >
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                  className={task.completed ? "bg-primary border-primary" : ""}
                />
                <div className="flex-1">
                  <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {format(task.dueDate, "MMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
