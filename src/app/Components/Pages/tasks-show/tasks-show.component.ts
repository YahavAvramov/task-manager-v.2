import { WebService } from './../../../Service/web.service';
import MyTask from 'src/app/Models/Task';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-show',
  templateUrl: './tasks-show.component.html',
  styleUrls: ['./tasks-show.component.css']
})
export class TasksShowComponent implements OnInit {
  @Input() allTasks: MyTask[] = [];
  @Input() filterTasks: MyTask[] = [];

  @Output() updateTasks: EventEmitter<any> = new EventEmitter<any>();
  showEditForm: boolean = false;
  showOptions: boolean = false;
  constructor(private service: WebService, private router: Router) { }

  ngOnInit(): void {
  }
  deletTask(task: MyTask) {
    this.service.deleteTask(task.id).subscribe();
    this.filterTasks = this.filterTasks.filter(t => t != task);
    this.allTasks = this.allTasks.filter(t => t != task);
    this.updateTasks.emit();
  }
//Routing to the edit component and sending the task using the URL address
  conectToEditForm(task: MyTask) {
    this.router.navigate(['/editor/', encodeURIComponent(JSON.stringify(task))])
  }
}
