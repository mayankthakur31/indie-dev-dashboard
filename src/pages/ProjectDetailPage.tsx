
import React from "react";
import { sampleProjects } from "../lib/data";
import ProjectDetail from "../components/ProjectDetail";

const ProjectDetailPage = () => {
  return <ProjectDetail projects={sampleProjects} />;
};

export default ProjectDetailPage;
