const db = require('../config/db');


const Reservas = {
    //Obtener todas las reservas
    getAll: async () => {
        try {
            const [rows] = await db.query("SELECT * FROM reservas");
            console.log("Reservas obtenidas");
            if (rows.length === 0) {
                return { message: "No se encontraron reservas." };
            }
            return rows;
        } catch (err) {
            console.error("Error al obtener las reservas: ", err);
            throw err;
        }
    },
    //Obtener reservas por ID
    getById: async (id) => {
        try {
            const [rows] = await db.query("SELECT * FROM reservas where id = ?", [id]);
            console.log("Reservas obtenidas");
            if (rows.length === 0) {
                return { message: "No se encontraron reservas." };
            }
            return rows;
        } catch (err) {
            console.error("Error al obtener las reservas: ", err);
            throw err;
        }
    },
    create: async (reserva) => {
        try {
            const { usuario_id, producto_id, fecha_reserva, cantidad, estado } = reserva;
            const [result] = await db.query(
                'INSERT INTO reservas (usuario_id, producto_id, fecha_reserva, cantidad, estado) VALUES (?, ?, ?, ?, ?, ?)',
                [usuario_id, producto_id, fecha_reserva, cantidad, estado]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },
    update: async (id, datosActualizados) => {
        try {
            const { usuario_id, producto_id, fecha_reserva, cantidad, estado } = datosActualizados;
            const [result] = await db.query(
                "UPDATE reservas SET usuario_id = ?, producto_id = ?, fecha_reserva = ?, cantidad = ?, estado = ? WHERE id = ?",
                [usuario_id, producto_id, fecha_reserva, cantidad, estado, id]
            );
            console.log("Reserva actualizada");
            return result.affectedRows > 0 
                ? { message: "Reserva actualizada exitosamente." }
                : { message: "No se encontró la reserva para actualizar." };
        } catch (err) {
            console.error("Error al actualizar la reserva: ", err);
            throw err;
        }
    },
    remove: async (id) => {
        try {
            const [result] = await db.query("DELETE FROM reservas WHERE id = ?", [id]);
            if (result.affectedRows > 0) {
                return { message: "Reserva eliminada exitosamente." };
            }
            return { message: "No se encontró la reserva para eliminar." };
        } catch (err) {
            console.error("Error al eliminar la reserva: ", err);
            throw err;
        }
    }


};

module.exports = Reservas;