import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './Components/Pages/home/home.component';
import { LayoutBarComponent } from './Components/layout-bar/layout-bar.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MakeNewTaskComponent } from './Components/Pages/make-new-task/make-new-task.component';
import { FormsModule} from '@angular/forms';
import { TasksShowComponent } from './Components/Pages/tasks-show/tasks-show.component';
import { EditFormComponent } from './Components/Pages/edit-form/edit-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'newTask', component: MakeNewTaskComponent },
  {path: 'editor/:pram', component: EditFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutBarComponent,
    MakeNewTaskComponent,
    TasksShowComponent,
    EditFormComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
   
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
