import MyTask from 'src/app/Models/Task';
import { WebService } from './../../../Service/web.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/Models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: WebService) { }

  departmentValues: string[] = [
    "Department",
    "Only direct managment",
    "Entire company",
    "Personal",
  ]
  users: User[] = [];
  showCover: boolean = false;
  blurredClass: string = "TaskBarMain";
  selectedUser!: User;
  allTasks: MyTask[] = [];
  filterTasks: MyTask[] = [];

  startDate!: Date;
  finishDate!: Date;


  ngOnInit(): void {
    //puling the users from the json-server
    this.service.getAllUsers().subscribe(data => {
      this.users = data as User[];
    });

    //pulling the tasks from the json-server
    this.service.getAllTasks().subscribe(data => {
      this.allTasks = data as MyTask[];
      this.filterTasks = data as MyTask[];
    });

  }

  coverAction() {
    this.showCover = !this.showCover;
    if (this.showCover) { this.blurredClass = 'TaskBarMainblurred' }
    else { this.blurredClass = "TaskBarMain" }
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  SubmitForm(taskToAdd: MyTask) {
    this.service.postTask(taskToAdd).subscribe();
    this.allTasks.push(taskToAdd);
    this.allTasks = this.allTasks;

    this.coverAction();

  }
  //this function get a date from the user and filter all the task that are befour this date
  filterByDate(date: any) {
    this.startDate = date;
    if (!date) { return; }
    //when it is a range date 
    if (this.finishDate) {
      this.filterTasks = this.allTasks.filter(t => t.startDate >= date.value && t.startDate <= this.finishDate);
    } //when it is only one date prameter
    else {
      this.filterTasks = this.allTasks.filter(t => t.startDate >= date.value);
    }
  }

  filterByFinishDate(date: any) {
    this.finishDate = date;
    if (!date) { return; }
    //when it is a range date 
    if (this.startDate) {
      this.filterTasks = this.allTasks.filter(t => t.startDate <= date.value && t.startDate >= this.startDate);
    }//when it is only one date prameter
    else {
      this.filterTasks = this.allTasks.filter(t => t.startDate <= date.value);
    }
  }

  onSelectPrivacy(privacy:any){
    if(privacy.target.value.toUpperCase()== "ALL"){ this.filterTasks = this.allTasks}
    else{
      this.filterTasks = this.allTasks.filter(t => t.privacy.toUpperCase() == privacy.target.value.toUpperCase());
    }
    
  }
}
