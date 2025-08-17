import projectsData from "@/services/mockData/projects.json";

class ProjectService {
  constructor() {
    this.projects = [...projectsData];
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    return [...this.projects];
  }

  async getById(id) {
    await this.delay();
    return this.projects.find(project => project.Id === id) || null;
  }

  async create(projectData) {
    await this.delay();
    const newId = Math.max(...this.projects.map(p => p.Id), 0) + 1;
    const newProject = {
      Id: newId,
      name: projectData.name || `Project ${newId}`,
      sampleRate: projectData.sampleRate || 44100,
      duration: projectData.duration || 0,
      createdAt: new Date().toISOString(),
      tracks: []
    };
    this.projects.push(newProject);
    return { ...newProject };
  }

  async update(id, projectData) {
    await this.delay();
    const index = this.projects.findIndex(project => project.Id === id);
    if (index === -1) return null;
    
    this.projects[index] = { ...this.projects[index], ...projectData };
    return { ...this.projects[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.projects.findIndex(project => project.Id === id);
    if (index === -1) return false;
    
    this.projects.splice(index, 1);
    return true;
  }
}

export default new ProjectService();