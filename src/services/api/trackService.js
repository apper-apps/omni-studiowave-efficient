import tracksData from "@/services/mockData/tracks.json";

class TrackService {
  constructor() {
    this.tracks = [...tracksData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.tracks];
  }

  async getById(id) {
    await this.delay();
    return this.tracks.find(track => track.Id === id) || null;
  }

  async create(trackData) {
    await this.delay();
    const newId = Math.max(...this.tracks.map(t => t.Id), 0) + 1;
    const newTrack = {
      Id: newId,
      name: trackData.name || `Track ${newId}`,
      volume: trackData.volume || 0.8,
      pan: trackData.pan || 0.0,
      muted: false,
      effects: []
    };
    this.tracks.push(newTrack);
    return { ...newTrack };
  }

  async update(id, trackData) {
    await this.delay();
    const index = this.tracks.findIndex(track => track.Id === id);
    if (index === -1) return null;
    
    this.tracks[index] = { ...this.tracks[index], ...trackData };
    return { ...this.tracks[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.tracks.findIndex(track => track.Id === id);
    if (index === -1) return false;
    
    this.tracks.splice(index, 1);
    return true;
  }
}

export default new TrackService();