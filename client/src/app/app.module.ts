import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalDialogComponent } from './shared/components/modal-dialog/modal-dialog.component';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { DragDropDirective } from './shared/directives/drag-drop.directive';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from './shared/services/upload.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ModalDialogComponent,
    LoginComponent,
    HomeComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
