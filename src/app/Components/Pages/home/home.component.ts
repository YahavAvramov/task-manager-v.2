import MyTask from 'src/app/Models/Task';
import { WebService } from './../../../Service/web.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/Models/User';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: WebService, private route: ActivatedRoute) { }

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

  taskToUpdate!: MyTask;
  privacy!: string;

  startDate!: Date;
  finishDate!: Date;


  ngOnInit(): void {
    // this part is geting a task from the edit component and update the ui by updating the tasks arrys.
    const paramString = this.route.snapshot.paramMap.get('pram'); //geting the task from the url bar
    if (paramString) {
      this.taskToUpdate = JSON.parse(decodeURIComponent(paramString));
      let index = this.allTasks.findIndex(task => task.id == this.taskToUpdate.id);
      if (index != -1) {
        this.allTasks[index] = this.taskToUpdate;
        this.allTasks = this.allTasks;
        this.filterTasks = this.allTasks;
      }
    }

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
  checkIfThereTasks() {
    if (this.filterTasks.length <= 0) { return true }
    else return false
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
   this.filterTasks = this.allTasks;
    this.coverAction();

  }
  //this function get a date range from the user and filter all the tasks that are not in this range
  filterByDate(startDate: any, finishDate: any) {
    //when user didn't selected
    if (!startDate.value && !finishDate.value) { this.filterTasks = this.allTasks; return;}

    //when finish date is undifind - fillter only by starting date
    if (!finishDate.value) {
      this.startDate = startDate.value;
      this.filterTasks = this.allTasks.filter(t => t.startDate >= startDate.value);
      return;
    }
    //when start date is undifind - filter only by finish date
    if (!startDate.value) {
      this.finishDate = finishDate.value;
      this.filterTasks = this.allTasks.filter(t => t.finishDate <= finishDate.value);
      return;
    }
    //when it is a range date
    if (startDate.value && finishDate.value) {
      this.startDate = startDate.value; this.finishDate = finishDate.value;
      this.filterTasks = this.allTasks.filter(t => t.startDate >= startDate.value && t.finishDate <= finishDate.value);
      return;
    }
    
  }



  onSelectPrivacy(privacy: any) {
    this.privacy = privacy;
    if (privacy.target.value.toUpperCase() == "ALL") { this.filterTasks = this.allTasks }
    else {
      this.filterTasks = this.allTasks.filter(t => t.privacy.toUpperCase() == privacy.target.value.toUpperCase());
    }
  }

  updateTasks() {
    this.service.getAllTasks().subscribe(data => {
      this.allTasks = data as MyTask[];
    });
    //Update the filter list so we could see the changes in the view (in all categories)
    this.onSelectPrivacy(this.privacy);
    this.filterByDate(this.startDate, this.finishDate);
  }

}
