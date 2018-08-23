import { Project } from "./project";

export class ProjectViewModel {
  public state: string;
  public created: Date;
  public modified: Date;

  constructor(public project: Project) {
    this.state = 'view';
    this.created = new Date(project.created);
    this.modified = new Date(project.modified);
  }

  public toggle() {
    this.state = this.state === 'view' ? 'form' : 'view';
  }
}