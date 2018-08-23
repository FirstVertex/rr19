import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private listUrl = '/assets/data.json';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.listUrl);
  }
}
