
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SettingsPage = () => {
  const handleExport = () => {
    toast.info("Export functionality will be available soon");
  };
  
  const handleResetData = () => {
    toast.info("Reset data functionality will be available soon");
  };
  
  const handleConnect = () => {
    toast.info("Supabase connection will be available soon");
  };
  
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your ProjectPilot preferences
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="gradient-card p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Data Management</h2>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-medium">Export Data</h3>
                <p className="text-sm text-muted-foreground">
                  Download all your project data as JSON
                </p>
              </div>
              <Button onClick={handleExport}>Export Data</Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-medium">Reset to Default</h3>
                <p className="text-sm text-muted-foreground">
                  Reset app data to example projects
                </p>
              </div>
              <Button variant="destructive" onClick={handleResetData}>
                Reset Data
              </Button>
            </div>
          </div>
        </div>
        
        <div className="gradient-card p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Supabase Integration</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect to Supabase to enable authentication, database, and real-time features
            </p>
            <div className="flex justify-end">
              <Button onClick={handleConnect}>Connect Supabase</Button>
            </div>
          </div>
        </div>
        
        <div className="gradient-card p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">About ProjectPilot</h2>
          <div className="space-y-4">
            <p className="text-sm">
              ProjectPilot - A minimal project tracker for solo developers and indie hackers
            </p>
            <p className="text-sm text-muted-foreground">Version: 1.0.0</p>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript, Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
