
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, CheckCircle2, Code2, Laptop } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Track Your Projects with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                ProjectPilot
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              A minimal project tracker for solo developers and indie hackers.
              Keep your projects organized and on track.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <Code2 size={16} />
                  <span>View on GitHub</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Everything you need to stay on track
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="gradient-card p-6 rounded-lg flex flex-col">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Project Dashboard</h3>
              <p className="text-muted-foreground flex-grow">
                Get a clear overview of all your projects and their status at a glance.
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-lg flex flex-col">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Task Management</h3>
              <p className="text-muted-foreground flex-grow">
                Create, track, and complete tasks for each project with due dates.
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-lg flex flex-col">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Laptop className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Tech Stack Tracking</h3>
              <p className="text-muted-foreground flex-grow">
                Tag and organize projects by technologies used to keep your portfolio organized.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/dashboard">
              <Button variant="outline" className="gap-2">
                <span>Explore Features</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border mt-auto">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="font-semibold text-lg">ProjectPilot</div>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ for indie hackers
              </p>
            </div>
            
            <nav className="flex space-x-4 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/calendar" className="hover:text-foreground">
                Calendar
              </Link>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
