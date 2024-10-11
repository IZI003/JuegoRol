const mssql = require('mssql');
const DBManager = require('../Database/DBManagerMSSQL');
const dbManager = new DBManager();

exports.insertarUsuario = async function (req) {

    const fecha = new Date();
    const data = {
        nombre: { type: mssql.VarChar(50), value: req.nombre },
        apellido: { type: mssql.VarChar(50), value: req.apellido },
        mail: { type: mssql.VarChar(50), value: req.mail },
        password: { type: mssql.VarChar(50), value: req.password },
        telefono: { type: mssql.Int, value: req.telefono },
        fecha: { type: mssql.Date, value: fecha }
    };

    try {
        const result = await dbManager.insert('dbo.USUARIOS', data);
        return result;
    } catch (error) {
        console.error("Error al insertar el usuario:", error);
        throw error;
    }
}

exports.obtenerUsuarios = async function () {
    const query = 'SELECT * FROM dbo.USUARIOS';

    try {
        const result = await dbManager.select(query);
        return result;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}

exports.obtenerUsuariosId = async function (id) {
    const query = `SELECT * FROM dbo.USUARIOS where id_usuario = ${id}`;
    try {
        const result = await dbManager.selectId(query);
        return result;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}

// Función para actualizar un usuario
exports.actualizarUsuario = async function (req, idUsuario) {
    const data = {
        nombre: { type: mssql.VarChar(50), value: req.nombre },
        apellido: { type: mssql.VarChar(50), value: req.apellido },
        mail: { type: mssql.VarChar(50), value: req.mail },
        telefono: { type: mssql.Int, value: req.telefono }
    };

    const conditions = {
        id_usuario: { type: mssql.Int, value: idUsuario }
    };

    try {
        const result = await dbManager.update('dbo.USUARIOS', data, conditions);
        return result;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        throw error;
    }
}