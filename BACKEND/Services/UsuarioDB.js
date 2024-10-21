const mssql = require('mssql');
const DBManager = require('../Database/DBManagerMSSQL');
const dbManager = new DBManager();
const generateUnique = require('./UniqueGenerate');


exports.insertarUsuario = async function (req, req_full) {

    const query = `select * from account where c_id = '${req.user}' or c_headerb = '${req.email}'`;
    try {
        console.log(query);

        const result = await dbManager.select(query);
        console.log(result);

        if (!result || result.length === 0 || (Array.isArray(result[0]) && result[0].length === 0)) {
            const fecha = new Date();
            const ip = (req_full.headers && req_full.headers['x-forwarded-for']) ||
                (req_full.connection && req_full.connection.remoteAddress) ||
                req_full.ip;
            console.log("prueba ip");
            const act_id = generateUnique.generateUniqueId(); //GENERA UN ID 
            const account_data =
            {
                c_id: { type: mssql.VarChar(50), value: req.usuario },
                c_sheadera: { type: mssql.VarChar(50), value: 'reserve' },
                c_sheaderb: { type: mssql.VarChar(50), value: 'reserve' },
                c_sheaderc: { type: mssql.VarChar(50), value: 'reserve' },
                c_headera: { type: mssql.VarChar(50), value: req.password },
                c_headerb: { type: mssql.VarChar(50), value: req.email },
                c_headerc: { type: mssql.VarChar(50), value: 'reserve' },
                d_cdate: { type: mssql.Date, value: fecha },
                d_udate: { type: mssql.Date, value: fecha },
                c_status: { type: mssql.VarChar(50), value: 'F' },
                m_body: { type: mssql.VarChar(50), value: 'reserve' },
                acc_status: { type: mssql.VarChar(50), value: 'Normal' },
                salary: { type: mssql.Date, value: fecha },
                last_salary: { type: mssql.Date, value: fecha }
            };
            console.log(account_data);

            const data = {
                account: { type: mssql.VarChar(50), value: req.usuario },
                contact: { type: mssql.VarChar(50), value: req.telefono },
                name: { type: mssql.VarChar(50), value: req.nombre },
                email: { type: mssql.VarChar(50), value: req.email },
                ip: { type: mssql.VarChar(50), value: ip },
                event_points: { type: mssql.Int, value: 0 },
                cevent_points: { type: mssql.Int, value: 0 },
                refresh_count: { type: mssql.Int, value: 0 },
                ref_add_allow: { type: mssql.Int, value: 1 },
                referer: { type: mssql.VarChar(50), value: null }
            };
            console.log(data);

            const activ_data = {
                account: { type: mssql.VarChar(50), value: req.usuario },
                act_id: { type: mssql.VarChar(50), value: act_id },
            };
            console.log(activ_data);

            try {
                await dbManager.insert('AccountInfo', data);
                await dbManager.insert('account', account_data);
                await dbManager.insert('Activation', activ_data);

                return { error: false, menssege: "se guardo correctamente" };
            } catch (error) {
                console.error("Error al insertar el usuario:", error);
                return { error: true, menssege: error.menssege };
            }
        } else {
            return { error: true, menssege: "Ya existe el usuario" };
        }
    } catch (error) {
        console.error("Error al Crear el usuario:", error);
        return { error: true, menssege: error.menssege };
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