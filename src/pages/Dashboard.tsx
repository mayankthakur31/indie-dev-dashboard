
import React from "react";
import { sampleProjects } from "../lib/data";
import ProjectList from "../components/ProjectList";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track all your development projects
        </p>
      </div>
      
      <ProjectList projects={sampleProjects} />
    </div>
  );
};

export default Dashboard;
