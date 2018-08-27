import { Injectable } from '@angular/core';
import { Project } from 'src/app/models/project';
import { HttpClient } from '@angular/common/http';
import { ProjectViewModel } from 'src/app/models/project-viewmodel';
import { ProjectSearchViewModel } from 'src/app/models/project-search-viewmodel';
import { pipe, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private listUrl = '/assets/data.json';

  public searchModel: ProjectSearchViewModel;
  public allProjects: ProjectViewModel[];

  constructor(private http: HttpClient) {
    this.allProjects = [];
    this.searchModel = new ProjectSearchViewModel();
    this.getAll();
  }

  public getAll() {
    this.http.get<Project[]>(this.listUrl)
      .pipe(
        map((items: Project[]) => items.map(item => new ProjectViewModel(item))))
      .subscribe((result: ProjectViewModel[]) => this.allProjects = result);
  }

  public get budgetTotal(): number {
    return this.visibleProjects
      .map(item => item.project.budget)
      .reduce((a, b) => a + b, 0);
  }  

  public get visibleProjects(): ProjectViewModel[] {
    let createdFromDate: Date | undefined = this.searchModel.createdFrom ? new Date(this.searchModel.createdFrom) : undefined;
    let createdToDate: Date | undefined = this.searchModel.createdTo ? new Date(this.searchModel.createdTo) : undefined;
    let modifiedFromDate: Date | undefined = this.searchModel.modifiedFrom ? new Date(this.searchModel.modifiedFrom) : undefined;
    let modifiedToDate: Date | undefined = this.searchModel.modifiedTo ? new Date(this.searchModel.modifiedTo) : undefined;

    return this.allProjects.filter(item => {
      let match: boolean = true;
      if (match && this.searchModel.title && this.searchModel.title.length) {
        match = item.project.title.toLowerCase().indexOf(this.searchModel.title.toLowerCase()) >= 0;
      }
      if (match && this.searchModel.division && this.searchModel.division.length) {
        match = item.project.division.toLowerCase().indexOf(this.searchModel.division.toLowerCase()) >= 0;
      }
      if (match && this.searchModel.project_owner && this.searchModel.project_owner.length) {
        match = item.project.project_owner.toLowerCase().indexOf(this.searchModel.project_owner.toLowerCase()) >= 0;
      }
      if (match && this.searchModel.budget) {
        match = item.project.budget === this.searchModel.budget;
      }
      if (match && this.searchModel.status && this.searchModel.status.length) {
        match = item.project.status.toLowerCase().indexOf(this.searchModel.status.toLowerCase()) >= 0;
      }
      if (match && createdFromDate) {
        match = item.created >= createdFromDate;
      }
      if (match && createdToDate) {
        match = item.created <= createdToDate;
      }
      if (match && modifiedFromDate) {
        match = item.modified >= modifiedFromDate;
      }
      if (match && modifiedToDate) {
        match = item.modified <= modifiedToDate;
      }
      return match;
    });
  }
}
