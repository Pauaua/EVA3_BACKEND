const { create } = require("tar");
const db = require("../config/db");

const Envios = {

    //Obtener todos los envíos
    getAll: async () => {
        try {
            const [rows] = await db.query("SELECT * FROM envios");
            console.log("Envios obtenidos");
            if (rows.length === 0) {
                return { message: "No se encontraron envíos." };
            }
            return rows;
        } catch (err) {
            console.error("Error al obtener los envíos: ", err);
            throw err;
        }
    },
    //Obtener envios por ID
    getById: async (id) => {
        try {
            const [rows] = await db.query("SELECT * FROM envios WHERE id = ?", [id]);
            console.log("Envio obtenido");
            if (rows.length === 0) {
                return { message: "No se encontró el envío." };
            }
            return rows[0];
        } catch (err) {
            console.error("Error al obtener el envío: ", err);
            throw err;
        }
    },

    // Crear nuevo envío
    create: async (envio) => {
        try {
            const { reserva_id, fecha_despacho, estado, direccion } = envio;
            const [result] = await db.query(
                'INSERT INTO envios (reserva_id, fecha_despacho, estado, direccion) VALUES (?, ?, ?, ?)',
                [reserva_id, fecha_despacho, estado, direccion]
            );
            console.log("Envío creado");
            return result.insertId;
        } catch (err) {
            console.error("Error al crear el envío: ", err);
            throw err;
        }
    },

    // Actualizar un envío
    update: async (id, datosActualizados) => {
        try {
            const { reserva_id, fecha_despacho, estado, direccion } = datosActualizados;
            const [result] = await db.query(
                "UPDATE envios SET reserva_id = ?, fecha_despacho = ?, estado = ?, direccion = ? WHERE id = ?",
                [reserva_id, fecha_despacho, estado, direccion, id]
            );
            console.log("Envío actualizado");
            return result.affectedRows > 0 
                ? { message: "Envío actualizado exitosamente." }
                : { message: "No se encontró el envío para actualizar." };
        } catch (err) {
            console.error("Error al actualizar el envío: ", err);
            throw err;
        }
    },

    // Eliminar un envío
    remove: async (id) => {
        try {
            const [result] = await db.query("DELETE FROM envios WHERE id = ?", [id]);
            console.log("Envío eliminado");
            return result.affectedRows > 0 
                ? { message: "Envío eliminado exitosamente." }
                : { message: "No se encontró el envío para eliminar." };
        } catch (err) {
            console.error("Error al eliminar el envío: ", err);
            throw err;
        }
    },
    


};

module.exports = Envios;