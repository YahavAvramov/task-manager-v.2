import { WebService } from './../../../Service/web.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/Models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:WebService) { }

  departmentValues:string[] = [
"Finance",
"Information Technology",
"Marketing",
"Human Resources",
  ]
  users:User[]=[];
    showCover:boolean= false;
    blurredClass:string = "TaskBarMain";
    selectedUser!:User;

  
  ngOnInit(): void {
    this.service.getAllUsers().subscribe(data=>{
this.users = data as User[];
    })
  }

  coverAction(){
this.showCover =! this.showCover;
    if(this.showCover){this.blurredClass='TaskBarMainblurred'}
    else{this.blurredClass ="TaskBarMain"}
      
  }
  
  setSelectedUser(user:User){
    this.selectedUser = user;
  }
}
