const Reservas = require('../models/reservas');

const getAll = async (req, res) => {    
    try {
        const result = await Reservas.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener las reservas: ", err);
        res.status(500).json({ error: "Error al obtener las reservas" });
    }
};
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Reservas.getById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener la reserva: ", err);
        res.status(500).json({ error: "Error al obtener la reserva" });
    }
};

const create = async (req, res) => {
    try {
        const reserva = req.body;
        const result = await Reservas.create(reserva);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error al crear la reserva: ", err);
        res.status(500).json({ error: "Error al crear la reserva" });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const result = await Reservas.update(id, datosActualizados);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar la reserva: ", err);
        res.status(500).json({ error: "Error al actualizar la reserva" });
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Reservas.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al eliminar la reserva: ", err);
        res.status(500).json({ error: "Error al eliminar la reserva" });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};


