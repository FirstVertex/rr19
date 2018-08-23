import { ProjectViewModel } from "./project-viewmodel";

export class ProjectSearchViewModel {
  public title: string | null;
  public division: string | null;
  public project_owner: string | null;
  public budget: number | null;
  public status: string | null;
  public createdFrom: string | null;
  public createdTo: string | null;
  public modifiedFrom: string | null;
  public modifiedTo: string | null;

  public filter(items: ProjectViewModel[]): ProjectViewModel[] {
    return items.filter(item => {
      let match: boolean = true;
      if (match && this.title && this.title.length) {
        match = match && item.project.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0;
      }
      if (match && this.division && this.division.length) {
        match = match && item.project.division.toLowerCase().indexOf(this.division.toLowerCase()) >= 0;
      }
      if (match && this.project_owner && this.project_owner.length) {
        match = match && item.project.project_owner.toLowerCase().indexOf(this.project_owner.toLowerCase()) >= 0;
      }
      if (match && this.budget) {
        match = match && item.project.budget === this.budget;
      }
      if (match && this.status && this.status.length) {
        match = match && item.project.status.toLowerCase().indexOf(this.status.toLowerCase()) >= 0;
      }
      if (match && this.createdFrom) {
        match = match && item.created >= new Date(this.createdFrom);
      }
      if (match && this.createdTo) {
        match = match && item.created <= new Date(this.createdTo);
      }
      if (match && this.modifiedFrom) {
        match = match && item.modified >= new Date(this.modifiedFrom);
      }
      if (match && this.modifiedTo) {
        match = match && item.modified <= new Date(this.modifiedTo);
      }
      return match;
    });
  }
}