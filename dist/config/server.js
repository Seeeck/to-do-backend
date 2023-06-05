"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_list_routes_1 = __importDefault(require("express-list-routes"));
const taskRoute = require('../routes/taskRoute');
const userRoute = require('../routes/userRoute');
const database_1 = __importDefault(require("./database"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 3001;
        //Inicializo la base de datos
        this.initDb();
        this.initApp();
        this.initMiddlewares();
        this.initRoutes();
        (0, express_list_routes_1.default)(this.app);
    }
    ;
    initDb() {
        database_1.default.sync().then(db => console.log('syncing tables..'));
    }
    ;
    initApp() {
        // respond with "hello world" when a GET request is made to the homepage
        this.app.listen(this.port, () => {
            console.log(`Server started at port ${this.port}`);
        });
    }
    ;
    initRoutes() {
        this.app.use('/task', taskRoute);
        this.app.use('/user', userRoute);
    }
    initMiddlewares() {
        this.app.use(express_1.default.json());
    }
}
// Exporta la instancia de Sequelize
exports.default = Server;
