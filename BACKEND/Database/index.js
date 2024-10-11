const getConnection = require('./MSSQL');
const mssql = require('./MSSQL');

require('dotenv').config();

const getquery = async (req, res) => {

    if (process.env.DB_TYPE === 'MSSQL') {
        try {
            if (req === undefined) {
                return;
            }
            const pool = await getConnection();
            const result = await pool.request().query(req);

            return (
                {
                    "error": false,
                    "status": 200,
                    "data": result.recordset,
                    "message": "Consulta exitosa"
                });
        } catch (error) {
            console.error(error);
            return (
                {
                    "error": true,
                    "status": 500,
                    "message": "Error en el server"
                });
        }
    }
}

module.exports = pool = async (req, res) => {

    if (process.env.DB_TYPE === 'MSSQL') {
        try {
            if (req === undefined) {
                return;
            }
            //  const pool = await getConnection().pool();
            const pool = await mssql();
            /* ps.input('timestamp', mssql.DateTime);
             ps.input('team', mssql.VarChar(6));
             await ps.prepare(stmt);
             await ps.execute({
               timestamp: timestamp,
               team: team,
             });*/


            return pool;
        } catch (error) {
            console.error(error);
            return (
                {
                    "error": true,
                    "status": 500,
                    "message": "Error en el server"
                });
        }
    }
}
module.exports = getquery;