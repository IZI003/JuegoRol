const UsuarioDB = require('../Services/UsuarioDB');
const Respuesta = require('../models/Respuesta');
exports.obtener = async (req, res) => {
    try {
        res.send(new Respuesta(null, 'OK', null, await UsuarioDB.obtenerUsuarios(req, res)));
    } catch (err) {
        console.error(err);
        res.status(500).send(new Respuesta("Error en el server", 'Fail', err.message, null));
        return;
    }
}

exports.obtenerporId = async (req, res) => {
    try {
        let cuenta = await UsuarioDB.obtenerUsuariosId(req.params.id);

        if (!cuenta || cuenta.length === 0) {
            return res.status(404).json(new Respuesta("Error no se encontro al usuario", 'Fail', "No hallado", null));
        }

        res.send(new Respuesta(null, 'OK', null, cuenta));
    } catch (err) {
        console.error(err);
        res.status(500).send(new Respuesta("Error en el server", 'Fail', err.message, null));
        return;
    }
}

exports.crear = async (req, res) => {
    try {
        res.send(new Respuesta(null, 'OK', null, await await UsuarioDB.insertarUsuario(req.body)));
    } catch (err) {
        console.error(err);
        res.status(500).send(new Respuesta("Error en el server", 'Fail', err.message, null));
        return;
    }
}

exports.actualizar = async (req, res) => {
    const idUsuario = req.params.id; // ID del usuario que se actualizará
    try {
        res.status(200).json(new Respuesta('Usuario actualizado correctamente', 'OK', null, await UsuarioDB.actualizarUsuario(req.body, idUsuario)));
    } catch (error) {
        res.status(500).json(new Respuesta('Error al actualizar el usuario', 'fail', error.message, null));
    }
}