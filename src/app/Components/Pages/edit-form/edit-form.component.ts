import User from 'src/app/Models/User';
import { WebService } from './../../../Service/web.service';
import MyTask from 'src/app/Models/Task';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  task!: MyTask; //The current task that has now been edited
  users: User[] = [];
  startDate!: Date;
  finishDate!: Date;
  privacy!: string;
  userPost!: User;
  textValue!: string;
  constructor(private route: ActivatedRoute, private service: WebService, private navRout: Router ,private location: Location) { }

  ngOnInit(): void {
    //get the task values by the URL bar - and parse this from JSON to object
    const paramString = this.route.snapshot.paramMap.get('pram');
    if (paramString) {
      this.task = JSON.parse(decodeURIComponent(paramString))as MyTask;
      this.startDate = this.task.startDate;
      this.finishDate = this.task.finishDate;
      this.privacy = this.task.privacy;
      this.userPost = this.task.userPost;
      this.textValue = this.task.textValue;
    }

    this.service.getAllUsers().subscribe(data => {
      this.users = data as User[];
    });
  }
//This function initializes the value of the task description
  changeTaskText(taskValue: string) {
    this.textValue = taskValue;
    this.task.textValue =taskValue;
  }
//This function initializes the user of the task
  activeSetUser(user: User) {
    this.userPost = user;
    this.task.userPost = user;
  }
  //This function changes the privacy level of the task according to the user's choice
  onPrivacySelect(privacy: any) {this.privacy = privacy.target.value;}
    
  cancle() { this.navRout.navigate(['']);  }//return to home component

   //This function changes the task date
  changeDate(date: any, isStartDate: boolean) {
    if (isStartDate) { this.startDate = date as Date }
    else { this.finishDate = date as Date }
  }
//This function changes the task in json-server and sends the object to the home component to update the UI
  async submitForm() {
    if (this.startDate > this.finishDate || !this.privacy || !this.userPost || !this.textValue) {
      return;
    }
    else { 
      this.task.textValue = this.textValue;
      this.task.startDate = this.startDate;
      this.task.finishDate = this.finishDate;
      this.task.privacy = this.privacy;
      this.task.userPost = this.userPost;
      this.service.putTask(this.task).subscribe();
      this.navRout.navigate(['/home/', encodeURIComponent(JSON.stringify(this.task))])
    }

  }
}
