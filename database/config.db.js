require('colors');
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONEXION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log(`Conectado a la Base de Datos.`.blue);

    } catch (error) {
        console.log(`No se puede conectar a la Base de Datos!!`.red);
        throw error;
    }
}

module.exports = {
    dbConnection,
}