import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { HttpClient } from '@angular/common/http';
import { ProjectViewModel } from 'src/app/models/project-viewmodel';
import { ProjectSearchViewModel } from 'src/app/models/project-search-viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private listUrl = '/assets/data.json';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.listUrl);
  }
  
  public filter(search: ProjectSearchViewModel, items: ProjectViewModel[] | undefined): ProjectViewModel[] {
    if (!items) return [];
    let createdFromDate: Date | undefined = search.createdFrom ? new Date(search.createdFrom) : undefined;
    let createdToDate: Date | undefined = search.createdTo ? new Date(search.createdTo) : undefined;
    let modifiedFromDate: Date | undefined = search.modifiedFrom ? new Date(search.modifiedFrom) : undefined;
    let modifiedToDate: Date | undefined = search.modifiedTo ? new Date(search.modifiedTo) : undefined;

    return items.filter(item => {
      let match: boolean = true;
      if (match && search.title && search.title.length) {
        match = item.project.title.toLowerCase().indexOf(search.title.toLowerCase()) >= 0;
      }
      if (match && search.division && search.division.length) {
        match = item.project.division.toLowerCase().indexOf(search.division.toLowerCase()) >= 0;
      }
      if (match && search.project_owner && search.project_owner.length) {
        match = item.project.project_owner.toLowerCase().indexOf(search.project_owner.toLowerCase()) >= 0;
      }
      if (match && search.budget) {
        match = item.project.budget === search.budget;
      }
      if (match && search.status && search.status.length) {
        match = item.project.status.toLowerCase().indexOf(search.status.toLowerCase()) >= 0;
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

  public getBudgetTotal(items: ProjectViewModel[]): number {
    return items
      .map(item => item.project.budget)
      .reduce((a, b) => a + b, 0);
  }
}
