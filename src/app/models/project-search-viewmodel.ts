import { ProjectViewModel } from "./project-viewmodel";

export class ProjectSearchViewModel {
  public title: string | undefined;
  public division: string | undefined;
  public project_owner: string | undefined;
  public budget: number | undefined;
  public status: string | undefined;
  public createdFrom: string | undefined;
  public createdTo: string | undefined;
  public modifiedFrom: string | undefined;
  public modifiedTo: string | undefined;
}