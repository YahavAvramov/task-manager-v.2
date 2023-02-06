import User from "./User";

class MyTask{

   public id: number =0;
    constructor(public textValue:string,
         public privacy:string, 
        public startDate:Date,
        public finishDate:Date,
        public userPost:User,
        ) { }
}
export default MyTask;