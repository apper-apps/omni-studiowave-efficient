import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ 
  className,
  title = "Audio Engine Error",
  message = "Failed to initialize audio engine. Please check your microphone permissions and try again.",
  onRetry
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-6 text-center", className)}>
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
        <ApperIcon name="AlertTriangle" size={32} className="text-error" />
      </div>
      
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-display font-semibold text-white">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </Button>
      )}
      
      <div className="text-sm text-gray-500 space-y-1">
        <p>Make sure:</p>
        <ul className="text-left space-y-1">
          <li>• Microphone permissions are granted</li>
          <li>• Audio device is connected and working</li>
          <li>• Browser supports Web Audio API</li>
        </ul>
      </div>
    </div>
  );
};

export default Error;