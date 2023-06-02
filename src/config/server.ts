
import express, { Request, Response, Application } from 'express';
import Database from './database';

const taskRoute = require('../routes/taskRoute');
const userRoute=require('../routes/userRoute');

class Server {
    app: Application = express();
    db?: Database;
    port:number=3000;
    

    constructor() {
        //Inicializo la base de datos
        this.initDb();
        this.initExpress();
        this.initRoutes();
    };

    initDb() {

        this.db = new Database({
            db_name: 'to_do_database',
            db_user: "seck",
            db_password: "seck123456",
            db_host: "to-do-instance.cn7g4pvobdw4.sa-east-1.rds.amazonaws.com",
            db_port: 5432, db_dialect: "postgres"
        });
    };

    initExpress() {
        // respond with "hello world" when a GET request is made to the homepage
        this.app.listen(this.port, () => {
            console.log(`Server started at port ${this.port}`);
          });
    };

    initRoutes(){
        this.app.use('/task/', taskRoute)
        this.app.use('/user/', userRoute)
    }

    initMiddlewares(){

    }
}





// Exporta la instancia de Sequelize
export default Server;