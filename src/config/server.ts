
import express, { Application } from 'express';
import expressListRoutes from 'express-list-routes';
const taskRoute = require('../routes/taskRoute');
const userRoute = require('../routes/userRoute');
import db from './database';
import taskSeeder from '../seeders/taskSeeder';
import authRoute from '../routes/authRoute';
import userSeeder from '../seeders/userSeeder';

require('dotenv').config();

class Server {
    app: Application = express();
    port: number = process.env.API_PORT ? parseInt(process.env.API_PORT) : 0;

    constructor() {
        //Inicializo la base de datos
        this.initDb();
        this.initApp();
        this.initMiddlewares();
        this.initRoutes();
        expressListRoutes(this.app);

    };

    initDb() {

        db.getQueryInterface().showAllTables().then(tables => {
          
            if (tables.length > 0) {


                db.drop({ cascade: true }).then(a => {
                    db.sync().then(db => {
                        this.initSeeder();
                        console.log('tables synchronized. ')
                    });
                });
            } else {
                db.sync().then(db => {
                    this.initSeeder();
                    console.log('tables synchronized. ')
                });
            }
        });

       

    };

    initSeeder() {
        taskSeeder({ users: 5, tasks: 50 });
        userSeeder({ users: 5 });
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
        this.app.use('/auth', authRoute)
    }

    initMiddlewares() {
        this.app.use(express.json());
    }
}


// Exporta la instancia de Sequelize
export default Server;