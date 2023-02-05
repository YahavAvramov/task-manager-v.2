import User from "./User";

class MyTask{

   public id: number =0;
    constructor(public textValue:string,
         public isTaskPrivate:boolean, 
        public department:string,
        public startDate:Date,
        public FinishDate:Date,
        public userPost:User,
        ) { }
}
export default MyTask;