import autotuneSettingsData from "@/services/mockData/autotuneSettings.json";

class AutotuneService {
  constructor() {
    this.settings = [...autotuneSettingsData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.settings];
  }

  async getById(id) {
    await this.delay();
    return this.settings.find(setting => setting.Id === id) || null;
  }

  async create(settingsData) {
    await this.delay();
    const newId = Math.max(...this.settings.map(s => s.Id), 0) + 1;
    const newSettings = {
      Id: newId,
      enabled: settingsData.enabled !== undefined ? settingsData.enabled : true,
      strength: settingsData.strength || 50,
      key: settingsData.key || "C",
      scale: settingsData.scale || "Major",
      formant: settingsData.formant || 0
    };
    this.settings.push(newSettings);
    return { ...newSettings };
  }

  async update(id, settingsData) {
    await this.delay();
    const index = this.settings.findIndex(setting => setting.Id === id);
    if (index === -1) return null;
    
    this.settings[index] = { ...this.settings[index], ...settingsData };
    return { ...this.settings[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.settings.findIndex(setting => setting.Id === id);
    if (index === -1) return false;
    
    this.settings.splice(index, 1);
    return true;
  }
}

export default new AutotuneService();