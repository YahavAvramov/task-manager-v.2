# Task-Manager
This project is a task management solution for teams, that edit, add, and delete tasks.\
Each task is equipped with detailed information such as creator, department, start/end dates, and a comprehensive description.

## Project layers
the task management application features a client-side built-in Angular and is coded in TypeScript.

The server side is simulation by JSON-server, that also provides data storage for user information and task details.

In the file `src\app\Service\web.service.ts` is the service that is responsible for communication between the Json server and the user UI. \
its allows the user to receive information and change information from that Json server.


### How to run
To start using the task management application\
simply duplicate the project to your local computer and open it in a code editor such as Visual Studio Code or your preferred platform.

##### `open a terminal window (CLI)`

Run this command in the CLI:
##### `npm run taskServer` 
This command runs the task server at port http://localhost:4100/Tasks on your computer, you can see the full command in the package.json file in the project.

##### `open a new terminal window (CLI)`

Run this command in the CLI:
##### `npm run usersServer`
This command runs the users server at port http://localhost:4000/Users on your computer, you can see the full command in the package.json file in the project.

##### `open a new terminal window (CLI)`
run the project by:
##### `ng serve`

### Technologies in the project:

##### Json-server/ Angular / TypeScript / Html / Css




