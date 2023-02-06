import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MyTask from '../Models/Task';
import User from '../Models/User';

// this is the url that the json server is run on
// if the server is not run - use the CLI to run this command : "npm run startServer"
const TaskServerURL = "http://localhost:4100/Tasks/";
const UsersServerUrl ="http://localhost:4000/Users/";
@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http:HttpClient ) { }
  //get All task in the DB
  getAllTasks(){
   return this.http.get(TaskServerURL);
}
// get Task by its id
getTaskById(id:number){
  return this.http.get(TaskServerURL+id)
}

//post new Task
postTask(task: MyTask){
    return this.http.post(TaskServerURL, task);
}

//change Task by new one
putTask(task: MyTask) {
    return this.http.put(TaskServerURL+task.id, task);
}

//remove Task from the DB
deleteTask(id:number){
    return this.http.delete(TaskServerURL +id);
}

//*************************************************
// users service functions
// use a difrent url here

  //get All users in the DB
  getAllUsers(){
    return this.http.get(UsersServerUrl);
}
// get user by its id
getUserById(id:number){
  return this.http.get(UsersServerUrl+id)
}

//post new user
addUser(user: User){
    return this.http.post(UsersServerUrl, User);
}

//change user by new one
ChangeUser(user: User) {
    return this.http.put(UsersServerUrl+user.id, user);
}

//remove user from the DB
deleteUser(id:number){
    return this.http.delete(UsersServerUrl + id);
}
}
