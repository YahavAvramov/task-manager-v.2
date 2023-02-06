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
  task!: MyTask;
  users: User[] = [];
  startDate!: Date;
  finishDate!: Date;
  privacy!: string;
  userPost!: User;
  textValue!: string;
  constructor(private route: ActivatedRoute, private service: WebService, private navRout: Router ,private location: Location) { }

  ngOnInit(): void {
    const paramString = this.route.snapshot.paramMap.get('pram');
    if (paramString) {
      this.task = JSON.parse(decodeURIComponent(paramString));
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

  changeTaskText(taskValue: string) {
    this.textValue = taskValue;
    this.task.textValue =taskValue;
  }

  activeSetUser(user: User) {
    this.userPost = user;
    this.task.userPost = user;
  }
  onPrivacySelect(privacy: any) {
    this.privacy = privacy.target.value;
  }
  cancle() {
    this.navRout.navigate(['']);
  }

  changeDate(date: any, isStartDate: boolean) {
    if (isStartDate) { this.startDate = date as Date }
    else { this.finishDate = date as Date }
  }

  async submitForm() {
    if (this.startDate > this.finishDate || !this.privacy || !this.userPost || !this.textValue) {
      return;
    }
    else {
      this.service.deleteTask(this.task.id).subscribe();
      this.task = new MyTask(this.textValue, this.privacy, this.startDate, this.finishDate, this.userPost);
      this.service.postTask(this.task).subscribe();
      this.navRout.navigate(['']);

    }

  }
}
