import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const WaveformDisplay = ({ 
  audioBuffer, 
  isPlaying,
  currentTime = 0,
  duration = 0,
  onSeek,
  className 
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const parent = canvasRef.current.parentElement;
        setDimensions({
          width: parent.clientWidth,
          height: 200
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = dimensions;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = "#1E272E";
    ctx.fillRect(0, 0, width, height);

    // Draw waveform
    if (audioBuffer && audioBuffer.length > 0) {
      const data = audioBuffer.getChannelData(0);
      const step = Math.ceil(data.length / width);
      const amp = height / 2;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#00CEC9");
      gradient.addColorStop(0.5, "#6C5CE7");
      gradient.addColorStop(1, "#00CEC9");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let i = 0; i < width; i++) {
        let min = 1.0;
        let max = -1.0;
        
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        
        const x = i;
        const yMin = (1 + min) * amp;
        const yMax = (1 + max) * amp;
        
        ctx.fillRect(x, yMin, 1, yMax - yMin);
      }
    } else {
      // Draw placeholder waveform
      ctx.strokeStyle = "rgba(108, 92, 231, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let i = 0; i < width; i += 10) {
        const y = height / 2 + Math.sin(i * 0.02) * 20;
        ctx.lineTo(i, y);
      }
      ctx.stroke();
    }

    // Draw playhead
    if (duration > 0) {
      const playheadX = (currentTime / duration) * width;
      ctx.strokeStyle = "#00CEC9";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
      
      // Draw playhead glow
      ctx.shadowColor = "#00CEC9";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

  }, [audioBuffer, dimensions, currentTime, duration]);

  const handleCanvasClick = (e) => {
    if (!onSeek || duration === 0) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickTime = (x / dimensions.width) * duration;
    onSeek(clickTime);
  };

  return (
    <div className={cn("bg-surface rounded-lg p-4", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-display font-semibold gradient-text">
          Waveform
        </h3>
      </div>
      <div className="relative bg-background rounded border border-gray-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full cursor-crosshair"
          style={{ height: "200px" }}
        />
        {!audioBuffer && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No audio loaded</span>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, "0")}</span>
        <span>{Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default WaveformDisplay;