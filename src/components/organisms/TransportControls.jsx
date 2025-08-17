import React from "react";
import TransportButton from "@/components/molecules/TransportButton";
import { cn } from "@/utils/cn";

const TransportControls = ({ 
  isRecording, 
  isPlaying, 
  onRecord, 
  onPlay, 
  onPause, 
  onStop,
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-center space-x-3", className)}>
      <TransportButton
        icon="Square"
        label="Stop"
        onClick={onStop}
      />
      <TransportButton
        icon="SkipBack"
        label="Previous"
        onClick={() => {}}
      />
      <TransportButton
        icon={isPlaying ? "Pause" : "Play"}
        label={isPlaying ? "Pause" : "Play"}
        active={isPlaying}
        onClick={isPlaying ? onPause : onPlay}
      />
      <TransportButton
        icon="SkipForward"
        label="Next"
        onClick={() => {}}
      />
      <TransportButton
        icon="Circle"
        label="Record"
        active={isRecording}
        onClick={onRecord}
        className={cn(
          isRecording && "!bg-error hover:!bg-error/80"
        )}
      />
    </div>
  );
};

export default TransportControls;