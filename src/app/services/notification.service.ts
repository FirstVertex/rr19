import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public message: string | undefined;

  constructor() { }

  public info(notice: string) {
    this.message = notice;
    timer(1000).subscribe(() => this.message = undefined);
  }
}
