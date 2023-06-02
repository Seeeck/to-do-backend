
import express, { Request, Response, Application } from 'express';

import Database from './database';

class Server {
    app: Application = express();
    db?: Database;



    constructor() {
        //Inicializo la base de datos
        this.initDb();
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
}





// Exporta la instancia de Sequelize
export default Server;