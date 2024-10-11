/*const Cuenta = require("../models/Cuenta");

exports.obtener = async (req, res) => {
    try {
        const cuenta = await Cuenta.find();
        res.send(cuenta);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el server");
        return;
    }
}

exports.obtenerporId = async (req, res) => {
    try {
        let cuenta = await Cuenta.findById(req.params.id);

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
        let cuenta = new Cuenta(req.body)
        await cuenta.save();
        res.send(cuenta);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el server");
        return;
    }
}


exports.actualizar = async (req, res) => {
    const { nombre, tipo_cuenta, monto, fecha, estado } = req.body
    let cuenta = await Cuenta.findById(req.params.id);

    if (!cuenta) {
        res.status(404).json({ msg: "no existe la cuenta" })
    }

    cuenta.nombre = nombre;
    cuenta.tipo_cuenta = tipo_cuenta;
    cuenta.monto = monto;
    cuenta.fecha = fecha;
    cuenta.estado = estado;

    cuenta = await Cuenta.findOneAndUpdate({ _id: req.params.id }, cuenta, { new: true });
    res.json(cuenta);
}

exports.eliminar = async (req, res) => {

    let cuenta = await Cuenta.findById(req.params.id);

    if (!cuenta) {
        res.status(404).json({ msg: "no existe la cuenta" })
    }

    await Cuenta.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "se elimino correctamente" });
}*/

//const servicio = require('../Services/PerfilDB');
const UsuarioDB = require('../Services/UsuarioDB');

exports.obtener = async (req, res) => {
    try {

        const respuesta = await UsuarioDB.obtenerUsuarios(req, res);
        console.log(respuesta);
        res.send(respuesta);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el server");
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