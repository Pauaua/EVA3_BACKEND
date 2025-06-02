const Productos = require("../models/productos");

const getAll = async (req, res) => {
    try {
        const result = await Productos.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener los productos: ", err);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Productos.getById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener el producto: ", err);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
}

const getByReservaId = async (req, res) => {
    try {
        const reservaId = req.params.reservaId;
        const result = await Productos.getByReservaId(reservaId);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener el producto por ID de reserva: ", err);
        res.status(500).json({ error: "Error al obtener el producto por ID de reserva" });
    }
}

const create = async (req, res) => {
    try {
        const producto = req.body;
        const result = await Productos.create(producto);
        res.status(201).json({ id: result });
    } catch (err) {
        console.error("Error al crear el producto: ", err);
        res.status(500).json({ error: "Error al crear el producto" });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const result = await Productos.update(id, datosActualizados);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar el producto: ", err);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
}

const updateStock = async (req, res) => {
    try {
        const id = req.params.id;
        const { cantidad } = req.body;
        const result = await Productos.updateStock(id, cantidad);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar el stock del producto: ", err);
        res.status(500).json({ error: "Error al actualizar el stock del producto" });
    }
}

const updateEstado = async (req, res) => {
    try {
        const id = req.params.id;
        const { estado_reserva } = req.body;
        const result = await Productos.updateEstado(id, estado_reserva);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al actualizar el estado de reserva del producto: ", err);
        res.status(500).json({ error: "Error al actualizar el estado de reserva del producto" });
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Productos.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error al eliminar el producto: ", err);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
}

module.exports = {
    getAll,
    getById,
    getByReservaId,
    create,
    update,
    updateStock,
    updateEstado,
    remove
};