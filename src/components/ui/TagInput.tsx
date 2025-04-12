
import React, { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  availableTags?: string[];
  placeholder?: string;
}

export function TagInput({
  tags,
  setTags,
  availableTags = [],
  placeholder = "Add tag...",
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInput("");
    setFilteredSuggestions([]);
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        addTag(filteredSuggestions[0]);
      } else {
        addTag(input);
      }
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value) {
      const filtered = availableTags.filter(tag =>
        tag.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
    setInput("");
    setFilteredSuggestions([]);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="flex flex-wrap gap-2 p-2 bg-background border border-input rounded-md focus-within:ring-1 focus-within:ring-ring min-h-10"
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            className="tag flex items-center bg-secondary text-secondary-foreground py-1 px-2 rounded-full text-xs"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-secondary-foreground hover:text-foreground focus:outline-none"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="flex-1">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="border-0 outline-none bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 h-auto min-w-[120px]"
            onFocus={() => setIsActive(true)}
            onBlur={() => {
              // Small delay to allow clicking on suggestion
              setTimeout(() => setIsActive(false), 100);
            }}
          />
        </div>
      </div>
      
      {isActive && filteredSuggestions.length > 0 && (
        <div className="mt-1 bg-background border border-input rounded-md shadow-md z-10 absolute max-h-48 overflow-y-auto w-full max-w-md">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-accent"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagInput;
