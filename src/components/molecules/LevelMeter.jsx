import React from "react";
import { cn } from "@/utils/cn";

const LevelMeter = ({ level = 0, label, className }) => {
  const segments = 20;
  const activeSegments = Math.floor((level / 100) * segments);

  return (
    <div className={cn("flex flex-col items-center space-y-1", className)}>
      <div className="flex flex-col-reverse space-y-reverse space-y-px bg-surface rounded p-1 h-40">
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-4 h-1.5 rounded-sm transition-all duration-75",
              i < activeSegments 
                ? i < segments * 0.7 
                  ? "bg-success" 
                  : i < segments * 0.9 
                  ? "bg-warning" 
                  : "bg-error"
                : "bg-gray-700"
            )}
          />
        ))}
      </div>
      {label && (
        <span className="text-xs text-gray-400">{label}</span>
      )}
    </div>
  );
};

export default LevelMeter;