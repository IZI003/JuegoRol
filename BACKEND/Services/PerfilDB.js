const getquery = require('../Database/index');
const mssql = require('mssql');

exports.obtener = async (req, res) => {
    try {
        console.log(req);
        const usuarios = await getquery("SELECT * FROM dbo.USUARIOS", req);

        if (usuarios.error === true) {
            console.error(usuarios);
            return { status: 'fail', message: 'Error en la consulta ', error: true };
        }
        else {
            return { datos: usuarios.data, status: 'success', message: 'OK', error: false };
        }
    } catch (err) {
        console.error(err);
        return { status: 'fail', message: 'Error al conectar BD', error: true };
    }
}

exports.obtener_Id = async (req, res) => {
    try {
        const usuarios = await getquery("SELECT * FROM dbo.USUARIOS where id_usuario = $1", [req]);

        if (usuarios.error === true) {
            console.error(usuarios);
            return { status: 'fail', message: 'Error en la consulta ', error: true };
        }
        else {
            return { datos: usuarios.data, status: 'success', message: 'OK', error: false };
        }
    } catch (err) {
        console.error(err);
        return { status: 'fail', message: 'Error al conectar BD', error: true };
    }
}

exports.crear = async (req, res) => {
    try {
        console.log(req.nombre);


        /* ps.input('timestamp', mssql.DateTime);
         ps.input('team', mssql.VarChar(6));
         await ps.prepare(stmt);
         await ps.execute({
             timestamp: timestamp,
             team: team,
         });
 */
        //const ps = await getquery.PreparedStatement(mssql.pool);
        const usuarios = await getquery()
            .input('p1', mssql.VarChar(50), req.nombre)
            .input('p2', mssql.VarChar(50), req.apellido)
            .input('p3', mssql.VarChar(50), req.mail)
            .input('p4', mssql.VarChar(50), req.password)
            .input('p5', mssql.Int, req.telefono)
            .query('INSERT INTO dbo.USUARIOS (nombre, apellido, mail, password, telefono, fecha) VALUES (@p1, @p2, @p3, @p4, @p5, GETDATE())');
        //   const usuarios = await getquery("INSERT INTO dbo.USUARIOS (nombre, apellido, mail, password, telefono, fecha) VALUES ([req], GETDATE())");

        if (usuarios.error === true) {
            console.error(usuarios);
            return { status: 'fail', message: 'Error en la consulta ', error: true };
        }
        else {
            return { datos: usuarios.data, status: 'success', message: 'OK', error: false };
        }
    } catch (err) {
        console.error(err);
        return { status: 'fail', message: 'Error al conectar BD', error: true };
    }
}