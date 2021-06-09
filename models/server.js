const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const { createServer } = require('http');

const { dbConnection } = require('../database/config.db');
const { socketController } = require('../socket/socketController');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios'
        }

        //Conexión Base de datos
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Rutas aplicacion
        this.routes();

        //Sockets
        this.sockets();
    }

    async dbConnection() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(this.port, () => {

        })
    }
}

module.exports = Server;