import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectViewModel } from 'src/app/models/project-viewmodel';
import { NotificationService } from 'src/app/services/notification.service';
import { timer } from 'rxjs';
import { ProjectSearchViewModel } from 'src/app/models/project-search-viewmodel';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects: ProjectViewModel[];
  public state: string = 'idle';
  public isSearchVisible: boolean;
  public searchParams: ProjectSearchViewModel;

  constructor(private service: ProjectService,
    private notificationService: NotificationService) {
      this.isSearchVisible = false;
      this.searchParams = new ProjectSearchViewModel();
    }

  ngOnInit() {
    this.state = 'loading';
    this.service.getAll()
    .subscribe(
      (data: Project[]) => {
        this.projects = data.map(item => new ProjectViewModel(item));
        console.log(this.projects);
      },
      (error) => {},  // todo: error handling
      () => this.state = 'idle'
    );
  }

  public get visibleProjects(): ProjectViewModel[] {
    if (!this.projects) return [];
    return this.searchParams.filter(this.projects);
  }

  public get budgetTotal(): string | null {
    return this.visibleProjects.map(item => item.project.budget)
      .reduce((a, b) => a + b, 0).toFixed(2);
  }

  public close(vm: ProjectViewModel) {
    vm.toggle();
    // do this async to allow row to collapse first
    timer(0).subscribe(_=> this.notificationService.info('Project updated'));
  }

  public details(vm: ProjectViewModel) {
    this.notificationService.info(`Display Project details for ${vm.project.title}`);
  }

  public addProject() {
    this.notificationService.info('Add a Project');
  }

  public exportToExcel() {
    this.notificationService.info('Export to Excel');
  }
}
