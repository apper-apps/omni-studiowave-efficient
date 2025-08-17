import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ExportDialog = ({ 
  isOpen, 
  onClose, 
  onExport,
  className 
}) => {
  const [exportSettings, setExportSettings] = useState({
    format: "wav",
    quality: "high",
    filename: "recording",
    sampleRate: 44100,
    bitDepth: 16
  });

  const handleExport = () => {
    onExport(exportSettings);
  };

  const formatOptions = [
    { value: "wav", label: "WAV (Uncompressed)" },
    { value: "mp3", label: "MP3 (Compressed)" }
  ];

  const qualityOptions = [
    { value: "low", label: "Low (128 kbps)" },
    { value: "medium", label: "Medium (192 kbps)" },
    { value: "high", label: "High (320 kbps)" },
    { value: "lossless", label: "Lossless" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={cn("bg-surface rounded-lg p-6 w-full max-w-md mx-4", className)}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold gradient-text">
            Export Audio
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <FormField label="Filename">
            <Input
              value={exportSettings.filename}
              onChange={(e) => setExportSettings({
                ...exportSettings,
                filename: e.target.value
              })}
              placeholder="Enter filename..."
            />
          </FormField>

          <FormField label="Format">
            <Select
              value={exportSettings.format}
              onChange={(e) => setExportSettings({
                ...exportSettings,
                format: e.target.value
              })}
            >
              {formatOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Quality">
            <Select
              value={exportSettings.quality}
              onChange={(e) => setExportSettings({
                ...exportSettings,
                quality: e.target.value
              })}
            >
              {qualityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>

          {exportSettings.format === "wav" && (
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Sample Rate">
                <Select
                  value={exportSettings.sampleRate}
                  onChange={(e) => setExportSettings({
                    ...exportSettings,
                    sampleRate: Number(e.target.value)
                  })}
                >
                  <option value={22050}>22.05 kHz</option>
                  <option value={44100}>44.1 kHz</option>
                  <option value={48000}>48 kHz</option>
                  <option value={96000}>96 kHz</option>
                </Select>
              </FormField>

              <FormField label="Bit Depth">
                <Select
                  value={exportSettings.bitDepth}
                  onChange={(e) => setExportSettings({
                    ...exportSettings,
                    bitDepth: Number(e.target.value)
                  })}
                >
                  <option value={16}>16-bit</option>
                  <option value={24}>24-bit</option>
                  <option value={32}>32-bit</option>
                </Select>
              </FormField>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            className="flex-1 flex items-center gap-2"
          >
            <ApperIcon name="Download" size={16} />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;