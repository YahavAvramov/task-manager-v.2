import User from 'src/app/Models/User';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import MyTask from 'src/app/Models/Task';

@Component({
  selector: 'app-make-new-task',
  templateUrl: './make-new-task.component.html',
  styleUrls: ['./make-new-task.component.css']
})
export class MakeNewTaskComponent implements OnInit {

  constructor() { }
  selectPrivacy!: string;
  taskContent!: string;

  startDate!: Date;
  finishDate!: Date;

  alertClass: string = "notActive"

  taskToAdd!: MyTask;
  @Input() selectedUser!: User;
  @Input() users!: User[];
  @Output() unshowPopUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() setSelectedUser: EventEmitter<User> = new EventEmitter<User>();

  @Output() submitFormEvent: EventEmitter<MyTask> = new EventEmitter<MyTask>();


  ngOnInit(): void { }

  //This function tells the parent component to close the popup window
  coverAction() { this.unshowPopUp.emit(); }

  //This function returns the selected user to the parent component
  activeSetUser(user: User) { this.setSelectedUser.emit(user); }

  //this function take the value from the select privacy section
  onPrivacySelect(event: any) { this.selectPrivacy = event.target.value; }


  //this function take the input value from the user and assign it to the typeScript object;
  changeTaskText(taskValue: string) { this.taskContent = taskValue; }

  chandeDate(date: any, isStartDate: boolean) {
    if (isStartDate) {
      this.startDate = date as Date;
    }
    else { this.finishDate = date as Date }
  }

  // This function consolidates all the information from the form into an object of type MyTask and sends it to the parent component
  submitForm() {
    if (!this.selectedUser || !this.selectPrivacy || !this.taskContent || this.startDate > this.finishDate) {
      this.alertClass = "activeAlert"

    }
    else {
      this.taskToAdd = new MyTask(this.taskContent, this.selectPrivacy, this.startDate, this.finishDate, this.selectedUser);
      this.submitFormEvent.emit(this.taskToAdd);
    }
  }


}
