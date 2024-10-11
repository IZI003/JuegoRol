const mssql = require('mssql');
require('dotenv').config({ path: 'dev.env' });

const config = {
    server: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

class DBManager {
    constructor() {
        this.config = config;
        this.pool = null;
    }

    // Conectar al pool de forma segura
    async getPool() {
        if (!this.pool) {
            this.pool = await mssql.connect(this.config);
        }
        return this.pool;
    }

    // Función genérica para ejecutar una consulta con parámetros
    async executeQuery(query, params) {
        const pool = await this.getPool();
        const request = pool.request();

        // Agregar parámetros de forma dinámica
        params.forEach(param => {
            request.input(param.name, param.type, param.value);
        });

        try {
            const result = await request.query(query);
            return result.recordsets;
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
            throw error;
        }
    }

    // Crear dinámicamente parámetros para las consultas
    createParam(name, type, value) {
        return { name, type, value };
    }

    // Método genérico para insertar registros dinámicamente
    async insert(table, data) {
        const fields = Object.keys(data).join(', ');
        const values = Object.keys(data).map((_, i) => `@p${i + 1}`).join(', ');

        const query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
        const params = Object.keys(data).map((key, i) =>
            this.createParam(`p${i + 1}`, data[key].type, data[key].value)
        );

        return await this.executeQuery(query, params).recordsets;
    }

    // Método genérico para hacer un SELECT
    async select(query, params) {
        const formattedParams = params ?
            params.map((param, i) => this.createParam(`p${i + 1}`, param.type, param.value))
            : [];
        return this.executeQuery(query, formattedParams);
    }

    async selectId(query) {
        const pool = await this.getPool();
        return (await this.pool.request().query(query)).recordset;
    }

    // Método genérico para actualizar registros dinámicamente
    async update(table, data, conditions) {
        const setClause = Object.keys(data).map((key, i) => `${key} = @p${i + 1}`).join(', ');
        const whereClause = Object.keys(conditions).map((key, i) => `${key} = @w${i + 1}`).join(' AND ');

        const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

        const setParams = Object.keys(data).map((key, i) =>
            this.createParam(`p${i + 1}`, data[key].type, data[key].value)
        );

        const whereParams = Object.keys(conditions).map((key, i) =>
            this.createParam(`w${i + 1}`, conditions[key].type, conditions[key].value)
        );

        const params = [...setParams, ...whereParams];
        console.log(params);
        console.log(query);

        return await this.executeQuery(query, params);
    }
}

module.exports = DBManager;
