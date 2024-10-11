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
        console.log(req.params.id);

        let cuenta = await UsuarioDB.obtenerUsuariosId(req.params.id);

        if (!cuenta) {
            return res.status(404).json({ msg: "No se encontro la cuenta" });
        }

        res.send(cuenta);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el server");
        return;
    }
}

exports.crear = async (req, res) => {
    try {
        console.log("prueba el servidor");
        let cuenta = await UsuarioDB.insertarUsuario(req.body)
        res.send(cuenta);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el server");
        return;
    }
}

exports.actualizar = async (req, res) => {

    const idUsuario = req.params.id; // ID del usuario que se actualizará

    try {
        const result = await UsuarioDB.actualizarUsuario(req.body, idUsuario)
        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado correctamente',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
}