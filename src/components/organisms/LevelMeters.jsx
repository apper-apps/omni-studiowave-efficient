import React from "react";
import LevelMeter from "@/components/molecules/LevelMeter";
import { cn } from "@/utils/cn";

const LevelMeters = ({ 
  inputLevel = 0, 
  outputLevel = 0, 
  className 
}) => {
  return (
    <div className={cn("bg-surface rounded-lg p-4", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-display font-semibold gradient-text">
          Levels
        </h3>
      </div>
      
      <div className="flex justify-center space-x-6">
        <LevelMeter level={inputLevel} label="Input" />
        <LevelMeter level={outputLevel} label="Output" />
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-400 space-y-1">
          <div>Input: {Math.round(inputLevel)}%</div>
          <div>Output: {Math.round(outputLevel)}%</div>
        </div>
      </div>
    </div>
  );
};

export default LevelMeters;