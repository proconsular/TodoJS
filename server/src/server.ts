import * as bodyParser from 'body-parser';

import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { createConnection } from 'typeorm';
import { UserController } from './controllers/UserController';
import { AdmissionController } from './controllers/AdmissionController'
import { TaskController } from './controllers/TaskController'
import { User } from './entity/User';
import { protect } from './middleware/authentication'
import { Task } from './entity/Task';

class AppServer extends Server {

    private readonly SERVER_STARTED = 'Server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        createConnection().then(async (connection) => {
            const repo = connection.getRepository(User)

            protect.repo = repo

            const users = new UserController(repo)
            this.addControllers(users)

            const admission = new AdmissionController(repo)
            this.addControllers(admission)

            const tasks = connection.getRepository(Task)
            const task = new TaskController(tasks)
            this.addControllers(task)

        }).catch((err) => {
            console.log(err)
        })

    }

    public start(port: number): void {
        // this.app.get('*', (req, res) => {
        //     res.send(this.SERVER_STARTED + port);
        // });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default AppServer;
