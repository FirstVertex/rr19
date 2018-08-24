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
    let createdFromDate: Date | undefined = this.createdFrom ? new Date(this.createdFrom) : undefined;
    let createdToDate: Date | undefined = this.createdTo ? new Date(this.createdTo) : undefined;
    let modifiedFromDate: Date | undefined = this.modifiedFrom ? new Date(this.modifiedFrom) : undefined;
    let modifiedToDate: Date | undefined = this.modifiedTo ? new Date(this.modifiedTo) : undefined;

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
      if (match && createdFromDate) {
        match = match && item.created >= createdFromDate;
      }
      if (match && createdToDate) {
        match = match && item.created <= createdToDate;
      }
      if (match && modifiedFromDate) {
        match = match && item.modified >= modifiedFromDate;
      }
      if (match && modifiedToDate) {
        match = match && item.modified <= modifiedToDate;
      }
      return match;
    });
  }
}