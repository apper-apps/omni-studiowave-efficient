import React, { useState, useCallback } from "react";
import { cn } from "@/utils/cn";

const Knob = ({ 
  value = 0, 
  onChange, 
  min = 0, 
  max = 100, 
  label,
  className 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const normalizedValue = (value - min) / (max - min);
  const rotation = normalizedValue * 270 - 135; // -135 to +135 degrees

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let degrees = (angle * 180) / Math.PI + 90;
    
    if (degrees < 0) degrees += 360;
    if (degrees > 270 && degrees < 360) degrees = 0;
    if (degrees > 270) degrees = 270;
    
    const normalizedValue = Math.max(0, Math.min(1, degrees / 270));
    const newValue = min + normalizedValue * (max - min);
    
    onChange?.(newValue);
  }, [isDragging, min, max, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div
        className="knob w-12 h-12 rounded-full cursor-pointer relative"
        onMouseDown={handleMouseDown}
        style={{
          transform: `rotate(${rotation}deg)`
        }}
      >
        <div className="absolute top-1 left-1/2 w-0.5 h-4 bg-white transform -translate-x-1/2 rounded-full" />
      </div>
      {label && (
        <span className="text-xs text-gray-400 text-center">{label}</span>
      )}
      <span className="text-xs text-white">{Math.round(value)}</span>
    </div>
  );
};

export default Knob;