import { Dialect, Sequelize, DataTypes } from "sequelize"
import { defineUserModel } from "../models/user";
import { defineTaskModel } from "../models/task";

interface dbSettings {
    db_name: string;
    db_user: string;
    db_password: string,
    db_host: string,
    db_port: number;
    db_dialect: Dialect;
}

class Database {

    sequelize: Sequelize;
    //Si existen parametros de base de datos se inicializa si no da error
    constructor(db: dbSettings) {
        if (db) {
            this.sequelize = new Sequelize(db.db_name, db.db_user, db.db_password, {
                host: db.db_host, port: db.db_port, dialect: db.db_dialect
            });
            this.init();
        } else {
            throw ('To initialize the database , the server need credentials and configs');
        }
    }

    public init() {
        this.initTables();
        this.sequelize?.sync();
        console.log('inicializado');
    }

    public initTables() {
        try {
            defineTaskModel(this.sequelize);
            defineUserModel(this.sequelize);
        } catch (e) {
            throw ('Tables initializacion error');
        }
    }

    public async dropTables() {
        try {
            await this.sequelize.drop();
            console.log('Tables deleted');
        } catch (e) {
            console.log('Drop tables error');
        }
    }



}

export default Database;