import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const EditingToolbar = ({ 
  selectedTool,
  onToolSelect,
  onCut,
  onCopy,
  onPaste,
  onUndo,
  onRedo,
  onFadeIn,
  onFadeOut,
  className 
}) => {
  const tools = [
    { id: "select", icon: "MousePointer", label: "Select" },
    { id: "cut", icon: "Scissors", label: "Cut" },
    { id: "zoom", icon: "ZoomIn", label: "Zoom" },
  ];

  return (
    <div className={cn("bg-surface rounded-lg p-4", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-display font-semibold gradient-text">
          Editing Tools
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tools.map(tool => (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onToolSelect(tool.id)}
            className="flex items-center gap-2"
          >
            <ApperIcon name={tool.icon} size={16} />
            {tool.label}
          </Button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCut}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Scissors" size={16} />
            Cut
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopy}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Copy" size={16} />
            Copy
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onPaste}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Clipboard" size={16} />
            Paste
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Undo" size={16} />
            Undo
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onFadeIn}
            className="flex items-center gap-2"
          >
            <ApperIcon name="TrendingUp" size={16} />
            Fade In
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onFadeOut}
            className="flex items-center gap-2"
          >
            <ApperIcon name="TrendingDown" size={16} />
            Fade Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditingToolbar;