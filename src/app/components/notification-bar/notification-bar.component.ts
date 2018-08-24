import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
  animations: [
    trigger('slideDown', [
      state('void', style({transform: 'translateY(-150%)'})),
      transition(':enter', [
        animate(300, style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate(300, style({transform: 'translateY(-150%)'}))
      ])
    ])
  ]
})
export class NotificationBarComponent {
  constructor(public service: NotificationService) { }
}
