import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ 
  className,
  title = "Ready to Record",
  message = "Start your first recording by clicking the record button. Your audio will appear as a waveform that you can edit and enhance with professional effects.",
  actionLabel = "Start Recording",
  onAction
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-6 text-center", className)}>
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <ApperIcon name="Mic" size={36} className="text-primary" />
      </div>
      
      <div className="space-y-3 max-w-md">
        <h3 className="text-2xl font-display font-bold gradient-text">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {message}
        </p>
      </div>

      {onAction && (
        <Button 
          onClick={onAction}
          size="lg"
          className="flex items-center gap-3 text-base"
        >
          <ApperIcon name="Circle" size={18} />
          {actionLabel}
        </Button>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm">
        <div className="flex flex-col items-center space-y-2 p-4 bg-surface/50 rounded-lg">
          <ApperIcon name="Waveform" size={20} className="text-accent" />
          <span className="text-gray-300">Real-time Waveforms</span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 bg-surface/50 rounded-lg">
          <ApperIcon name="Sliders" size={20} className="text-primary" />
          <span className="text-gray-300">Professional Effects</span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 bg-surface/50 rounded-lg">
          <ApperIcon name="Download" size={20} className="text-success" />
          <span className="text-gray-300">Export High Quality</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;