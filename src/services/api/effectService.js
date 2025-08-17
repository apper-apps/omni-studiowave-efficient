import effectsData from "@/services/mockData/effects.json";

class EffectService {
  constructor() {
    this.effects = [...effectsData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.effects];
  }

  async getById(id) {
    await this.delay();
    return this.effects.find(effect => effect.Id === id) || null;
  }

  async create(effectData) {
    await this.delay();
    const newId = Math.max(...this.effects.map(e => e.Id), 0) + 1;
    const newEffect = {
      Id: newId,
      type: effectData.type || "generic",
      enabled: effectData.enabled !== undefined ? effectData.enabled : true,
      parameters: effectData.parameters || {}
    };
    this.effects.push(newEffect);
    return { ...newEffect };
  }

  async update(id, effectData) {
    await this.delay();
    const index = this.effects.findIndex(effect => effect.Id === id);
    if (index === -1) return null;
    
    this.effects[index] = { ...this.effects[index], ...effectData };
    return { ...this.effects[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.effects.findIndex(effect => effect.Id === id);
    if (index === -1) return false;
    
    this.effects.splice(index, 1);
    return true;
  }
}

export default new EffectService();