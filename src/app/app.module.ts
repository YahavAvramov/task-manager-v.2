import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './Components/Pages/home/home.component';
import { LayoutBarComponent } from './Components/layout-bar/layout-bar.component';
import { UpTaskBarComponent } from './Components/up-task-bar/up-task-bar.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MakeNewTaskComponent } from './Components/Pages/make-new-task/make-new-task.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'newTask', component: MakeNewTaskComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UpTaskBarComponent,
    HomeComponent,
    LayoutBarComponent,
    MakeNewTaskComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
   
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
