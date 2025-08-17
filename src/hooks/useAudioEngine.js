import { useState, useEffect, useCallback, useRef } from "react";

const useAudioEngine = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [inputLevel, setInputLevel] = useState(0);
  const [outputLevel, setOutputLevel] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const playbackSourceRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const initializeAudioContext = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Create audio context
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);

      // Get microphone access
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        }
      });

      setStream(userStream);

      // Create media recorder
      const recorder = new MediaRecorder(userStream, {
        mimeType: "audio/webm"
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm"
        });
        recordedChunksRef.current = [];

        // Convert to audio buffer
        const arrayBuffer = await blob.arrayBuffer();
        const decodedBuffer = await context.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedBuffer);
        setDuration(decodedBuffer.duration);
      };

      setMediaRecorder(recorder);

      // Create analyser for level monitoring
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = context.createMediaStreamSource(userStream);
      source.connect(analyser);
      sourceRef.current = source;

      // Start level monitoring
      updateLevels();

    } catch (err) {
      console.error("Audio engine initialization failed:", err);
      setError(err.message || "Failed to initialize audio engine");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLevels = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate RMS level
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / dataArray.length);
    const level = (rms / 255) * 100;

    setInputLevel(level);
    setOutputLevel(isPlaying ? level * 0.8 : 0);

    animationFrameRef.current = requestAnimationFrame(updateLevels);
  }, [isPlaying]);

  const startRecording = useCallback(() => {
    if (!mediaRecorder || mediaRecorder.state !== "inactive") return;

    recordedChunksRef.current = [];
    mediaRecorder.start(100); // Collect data every 100ms
    setIsRecording(true);
  }, [mediaRecorder]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorder || mediaRecorder.state !== "recording") return;

    mediaRecorder.stop();
    setIsRecording(false);
  }, [mediaRecorder]);

  const playAudio = useCallback(() => {
    if (!audioContext || !audioBuffer) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    source.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const startTime = audioContext.currentTime;
    source.start();
    playbackSourceRef.current = source;
    setIsPlaying(true);

    // Update current time during playback
    const updateTime = () => {
      if (isPlaying && audioContext) {
        const elapsed = audioContext.currentTime - startTime;
        setCurrentTime(Math.min(elapsed, duration));
        
        if (elapsed < duration) {
          requestAnimationFrame(updateTime);
        }
      }
    };
    updateTime();

  }, [audioContext, audioBuffer, duration, isPlaying]);

  const pauseAudio = useCallback(() => {
    if (playbackSourceRef.current) {
      playbackSourceRef.current.stop();
      playbackSourceRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const stopAudio = useCallback(() => {
    if (playbackSourceRef.current) {
      playbackSourceRef.current.stop();
      playbackSourceRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const seekTo = useCallback((time) => {
    setCurrentTime(Math.max(0, Math.min(time, duration)));
    
    if (isPlaying) {
      pauseAudio();
      // Would need to implement seeking in a real audio engine
    }
  }, [duration, isPlaying, pauseAudio]);

  // Initialize on mount
  useEffect(() => {
    initializeAudioContext();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, [initializeAudioContext]);

  return {
    // State
    isRecording,
    isPlaying,
    currentTime,
    duration,
    inputLevel,
    outputLevel,
    audioBuffer,
    error,
    loading,
    
    // Actions
    startRecording,
    stopRecording,
    playAudio,
    pauseAudio,
    stopAudio,
    seekTo,
    retry: initializeAudioContext
  };
};

export default useAudioEngine;