
import express, { Application } from 'express';
import expressListRoutes from 'express-list-routes';
const taskRoute = require('../routes/taskRoute');
const userRoute = require('../routes/userRoute');

import db from './database';
import taskSeeder from '../seeders/taskSeeder';

class Server {
    app: Application = express();
    port: number = 3001;

    constructor() {
        //Inicializo la base de datos
        this.initDb();
        this.initApp();
        this.initMiddlewares();
        this.initRoutes();
        expressListRoutes(this.app);

    };

    initDb() {
        console.log("synchronizing tables");
        db.drop().then(a => {
            db.sync().then(db => {
                this.initSeeder();
                console.log('tables synchronized. ')
            });
        });
        /* db.sync().then(db => console.log('tables synqued')); */
    };

    initSeeder() {
        taskSeeder();
    };

    initApp() {
        // respond with "hello world" when a GET request is made to the homepage
        this.app.listen(this.port, () => {
            console.log(`Server started at port ${this.port}`);
        });
    };

    initRoutes() {
        this.app.use('/task', taskRoute)
        this.app.use('/user', userRoute)
    }

    initMiddlewares() {
        this.app.use(express.json());
    }
}





// Exporta la instancia de Sequelize
export default Server;