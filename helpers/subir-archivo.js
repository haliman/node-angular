const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * 
 * @param {*} files 
 * @param {*} extensionesValidas 
 * @param {*} carpeta 
 */
const subirArchivo = (files, extensionesValidas = ['png', 'jpeg', 'jpg', 'gif', 'jfif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es correcta`);
        };

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    });
}

module.exports = {
    subirArchivo
}