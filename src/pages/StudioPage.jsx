import React, { useState } from "react";
import { toast } from "react-toastify";
import TransportControls from "@/components/organisms/TransportControls";
import WaveformDisplay from "@/components/organisms/WaveformDisplay";
import AutotunePanel from "@/components/organisms/AutotunePanel";
import EditingToolbar from "@/components/organisms/EditingToolbar";
import LevelMeters from "@/components/organisms/LevelMeters";
import ExportDialog from "@/components/organisms/ExportDialog";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import useAudioEngine from "@/hooks/useAudioEngine";
import useAutotuneSettings from "@/hooks/useAutotuneSettings";

const StudioPage = () => {
  const [selectedTool, setSelectedTool] = useState("select");
  const [showExportDialog, setShowExportDialog] = useState(false);

  const {
    isRecording,
    isPlaying,
    currentTime,
    duration,
    inputLevel,
    outputLevel,
    audioBuffer,
    error: audioError,
    loading: audioLoading,
    startRecording,
    stopRecording,
    playAudio,
    pauseAudio,
    stopAudio,
    seekTo,
    retry: retryAudio
  } = useAudioEngine();

  const {
    settings: autotuneSettings,
    updateSettings: updateAutotuneSettings,
    loading: autotuneLoading,
    error: autotuneError
  } = useAutotuneSettings();

  const handleRecord = () => {
    if (isRecording) {
      stopRecording();
      toast.success("Recording stopped");
    } else {
      startRecording();
      toast.info("Recording started");
    }
  };

  const handlePlay = () => {
    playAudio();
    toast.info("Playback started");
  };

  const handlePause = () => {
    pauseAudio();
    toast.info("Playback paused");
  };

  const handleStop = () => {
    if (isRecording) {
      stopRecording();
      toast.success("Recording stopped");
    } else {
      stopAudio();
      toast.info("Playback stopped");
    }
  };

  const handleExport = (exportSettings) => {
    if (!audioBuffer) {
      toast.error("No audio to export");
      return;
    }

    // Simulate export process
    toast.success(`Exporting as ${exportSettings.format.toUpperCase()}...`);
    
    setTimeout(() => {
      toast.success(`${exportSettings.filename}.${exportSettings.format} exported successfully!`);
      setShowExportDialog(false);
    }, 2000);
  };

  const handleEditAction = (action) => {
    if (!audioBuffer) {
      toast.warning("No audio loaded for editing");
      return;
    }
    
    toast.info(`${action} applied`);
  };

  if (audioLoading || autotuneLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loading message="Initializing audio engine..." />
      </div>
    );
  }

  if (audioError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Error 
          title="Audio Engine Error"
          message={audioError}
          onRetry={retryAudio}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ApperIcon name="Music" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                StudioWave
              </h1>
              <p className="text-sm text-gray-400">Professional Audio Studio</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowExportDialog(true)}
              disabled={!audioBuffer}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Download" size={16} />
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Transport Bar */}
      <div className="glass-effect border-b border-gray-700 p-4">
        <TransportControls
          isRecording={isRecording}
          isPlaying={isPlaying}
          onRecord={handleRecord}
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
        />
        
        <div className="mt-3 text-center text-sm text-gray-400">
          <span className="inline-flex items-center gap-2">
            <ApperIcon name="Clock" size={14} />
            {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, "0")} / {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {!audioBuffer ? (
          <Empty
            title="Ready to Record"
            message="Start your first recording by clicking the record button. Your audio will appear as a waveform that you can edit and enhance with professional effects."
            actionLabel="Start Recording"
            onAction={handleRecord}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Left Panel - Tools & Levels */}
            <div className="lg:col-span-1 space-y-6">
              <EditingToolbar
                selectedTool={selectedTool}
                onToolSelect={setSelectedTool}
                onCut={() => handleEditAction("Cut")}
                onCopy={() => handleEditAction("Copy")}
                onPaste={() => handleEditAction("Paste")}
                onUndo={() => handleEditAction("Undo")}
                onRedo={() => handleEditAction("Redo")}
                onFadeIn={() => handleEditAction("Fade In")}
                onFadeOut={() => handleEditAction("Fade Out")}
              />
              
              <LevelMeters
                inputLevel={inputLevel}
                outputLevel={outputLevel}
              />
            </div>

            {/* Center Panel - Waveform */}
            <div className="lg:col-span-2">
              <WaveformDisplay
                audioBuffer={audioBuffer}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                onSeek={seekTo}
                className="h-full"
              />
            </div>

            {/* Right Panel - Effects */}
            <div className="lg:col-span-1">
              <AutotunePanel
                settings={autotuneSettings}
                onUpdateSettings={updateAutotuneSettings}
              />
            </div>
          </div>
        )}
      </div>

      {/* Export Dialog */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default StudioPage;