
import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Task } from "../types";

interface CalendarProps {
  tasks: Task[];
}

const Calendar = ({ tasks }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of week index for the start of the month (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = monthStart.getDay();
  
  // Create array of empty cells for days before the start of the month
  const emptyDaysBefore = Array.from({ length: startDayOfWeek }, (_, i) => i);
  
  // Create array of empty cells for days after the end of the month
  const totalCells = Math.ceil((startDayOfWeek + monthDays.length) / 7) * 7;
  const emptyDaysAfter = Array.from(
    { length: totalCells - (startDayOfWeek + monthDays.length) },
    (_, i) => i
  );
  
  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      return task.dueDate && isSameDay(task.dueDate, date);
    });
  };
  
  // Selected date tasks
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];
  
  return (
    <div className="space-y-6">
      {/* Calendar header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-secondary text-secondary-foreground">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 bg-card">
          {/* Empty cells before month start */}
          {emptyDaysBefore.map((_, index) => (
            <div
              key={`empty-before-${index}`}
              className="border-t border-r border-border aspect-square"
            />
          ))}
          
          {/* Actual month days */}
          {monthDays.map((day) => {
            const dayTasks = getTasksForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "border-t border-r border-border p-1 aspect-square relative",
                  !isCurrentMonth && "opacity-50",
                  isSelected && "bg-accent"
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex flex-col h-full">
                  <span className="text-sm p-1">{format(day, "d")}</span>
                  
                  {/* Show indicator for tasks */}
                  {dayTasks.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {dayTasks.length <= 2 ? (
                        dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              task.completed ? "bg-green-500" : "bg-primary"
                            )}
                          />
                        ))
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          {dayTasks.length} tasks
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Empty cells after month end */}
          {emptyDaysAfter.map((_, index) => (
            <div
              key={`empty-after-${index}`}
              className="border-t border-r border-border aspect-square"
            />
          ))}
        </div>
      </div>
      
      {/* Selected date tasks */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {selectedDate
            ? `Tasks for ${format(selectedDate, "MMMM d, yyyy")}`
            : "Select a date to view tasks"}
        </h3>
        
        <div className="space-y-2">
          {selectedDateTasks.length > 0 ? (
            selectedDateTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-card border border-border rounded-md flex items-center"
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full mr-3",
                    task.completed ? "bg-green-500" : "bg-primary"
                  )}
                />
                <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </span>
              </div>
            ))
          ) : selectedDate ? (
            <p className="text-muted-foreground">No tasks scheduled for this date</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
