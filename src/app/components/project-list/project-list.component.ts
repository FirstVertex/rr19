import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectViewModel } from 'src/app/models/project-viewmodel';
import { NotificationService } from 'src/app/services/notification.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  constructor(
    public service: ProjectService,
    private notificationService: NotificationService) { }

  public close(vm: ProjectViewModel) {
    vm.toggle();
    // do this async to allow row to collapse first
    timer(0).subscribe(() => this.notificationService.info('Project updated'));
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
