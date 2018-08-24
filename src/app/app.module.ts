import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './services/notification.service';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    NotificationBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [ProjectService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
