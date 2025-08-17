import React from "react";
import FormField from "@/components/molecules/FormField";
import Slider from "@/components/atoms/Slider";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Knob from "@/components/molecules/Knob";
import { cn } from "@/utils/cn";

const AutotunePanel = ({ 
  settings, 
  onUpdateSettings,
  className 
}) => {
  const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const scales = ["Major", "Minor", "Chromatic"];

  const handleToggle = () => {
    onUpdateSettings({
      ...settings,
      enabled: !settings.enabled
    });
  };

  const handleStrengthChange = (strength) => {
    onUpdateSettings({
      ...settings,
      strength
    });
  };

  const handleKeyChange = (e) => {
    onUpdateSettings({
      ...settings,
      key: e.target.value
    });
  };

  const handleScaleChange = (e) => {
    onUpdateSettings({
      ...settings,
      scale: e.target.value
    });
  };

  const handleFormantChange = (formant) => {
    onUpdateSettings({
      ...settings,
      formant
    });
  };

  return (
    <div className={cn("bg-surface rounded-lg p-4 space-y-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold gradient-text">
          Auto-Tune
        </h3>
        <Button
          variant={settings.enabled ? "default" : "outline"}
          size="sm"
          onClick={handleToggle}
        >
          {settings.enabled ? "ON" : "OFF"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Key">
          <Select 
            value={settings.key} 
            onChange={handleKeyChange}
            disabled={!settings.enabled}
          >
            {keys.map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Scale">
          <Select 
            value={settings.scale} 
            onChange={handleScaleChange}
            disabled={!settings.enabled}
          >
            {scales.map(scale => (
              <option key={scale} value={scale}>{scale}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="flex justify-around pt-4">
        <div className="text-center">
          <Knob
            value={settings.strength}
            onChange={handleStrengthChange}
            min={0}
            max={100}
            label="Correction"
            className={!settings.enabled ? "opacity-50 pointer-events-none" : ""}
          />
        </div>
        
        <div className="text-center">
          <Knob
            value={settings.formant}
            onChange={handleFormantChange}
            min={-50}
            max={50}
            label="Formant"
            className={!settings.enabled ? "opacity-50 pointer-events-none" : ""}
          />
        </div>
      </div>

      <div className="pt-2">
        <FormField label="Correction Strength">
          <Slider
            value={settings.strength}
            onChange={handleStrengthChange}
            min={0}
            max={100}
            disabled={!settings.enabled}
            className={!settings.enabled ? "opacity-50" : ""}
          />
        </FormField>
      </div>
    </div>
  );
};

export default AutotunePanel;