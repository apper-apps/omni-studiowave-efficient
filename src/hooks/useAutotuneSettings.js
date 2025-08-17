import { useState, useEffect } from "react";
import autotuneService from "@/services/api/autotuneService";

const useAutotuneSettings = () => {
  const [settings, setSettings] = useState({
    enabled: false,
    strength: 50,
    key: "C",
    scale: "Major",
    formant: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allSettings = await autotuneService.getAll();
      if (allSettings.length > 0) {
        const defaultSettings = allSettings[0];
        setSettings({
          enabled: defaultSettings.enabled,
          strength: defaultSettings.strength,
          key: defaultSettings.key,
          scale: defaultSettings.scale,
          formant: defaultSettings.formant
        });
      }
    } catch (err) {
      console.error("Failed to load autotune settings:", err);
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      setError(null);
      setSettings(newSettings);
      
      // In a real app, this would update the audio processing chain
      await autotuneService.update(1, newSettings);
    } catch (err) {
      console.error("Failed to update autotune settings:", err);
      setError("Failed to update settings");
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    updateSettings,
    loading,
    error,
    retry: loadSettings
  };
};

export default useAutotuneSettings;