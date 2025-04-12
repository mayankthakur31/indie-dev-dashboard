
import React from "react";
import { sampleProjects } from "../lib/data";
import Calendar from "../components/Calendar";

const CalendarPage = () => {
  // Get all tasks from all projects
  const allTasks = sampleProjects.flatMap(project => project.tasks);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Calendar</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your scheduled tasks
        </p>
      </div>
      
      <Calendar tasks={allTasks} />
    </div>
  );
};

export default CalendarPage;
