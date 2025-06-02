const db = require("../config/db");

const Pagos = {

    getAll: async () => {
        try {
            const [rows] = await db.query("SELECT * FROM pagos");
            console.log("Pagos obtenidos");
            if (rows.length === 0) {
                return { message: "No se encontraron pagos." };
            }
            return rows;
        } catch (err) {
            console.error("Error al obtener los pagos: ", err);
            throw err;
        }
    },

    getById: async (id) => {
        try {
            const [rows] = await db.query("SELECT * FROM pagos WHERE id = ?", [id]);
            console.log("Pago obtenido");
            if (rows.length === 0) {
                return { message: "No se encontró el pago." };
            }
            return rows[0];
        } catch (err) {
            console.error("Error al obtener el pago: ", err);
            throw err;
        }
    },

    // Crear un nuevo pago
    create: async (pago) => {
        try {
            const { usuario_id, reserva_id, monto, fecha_pago, metodo_pago, comprobante } = pago;
            const [result] = await db.query(
                'INSERT INTO pagos (usuario_id, reserva_id, monto, fecha_pago, metodo_pago, comprobante) VALUES (?, ?, ?, ?, ?, ?)',
                [usuario_id, reserva_id, monto, fecha_pago, metodo_pago, comprobante]
            );
            console.log("Pago creado");
            return result.insertId;
        } catch (err) {
            console.error("Error al crear el pago: ", err);
            throw err;
        }
    },

    // Actualizar un pago
    update: async (id, datosActualizados) => {
        try {
            const { usuario_id, reserva_id, monto, fecha_pago, metodo_pago, comprobante } = datosActualizados;
            const [result] = await db.query(
                "UPDATE pagos SET usuario_id = ?, reserva_id = ?, monto = ?, fecha_pago = ?, metodo_pago = ?, comprobante = ? WHERE id = ?",
                [usuario_id, reserva_id, monto, fecha_pago, metodo_pago, comprobante, id]
            );
            console.log("Pago actualizado");
            return result.affectedRows > 0 
                ? { message: "Pago actualizado exitosamente." }
                : { message: "No se encontró el pago para actualizar." };
        } catch (err) {
            console.error("Error al actualizar el pago: ", err);
            throw err;
        }
    },

    //Eliminar un pago
    remove: async (id) => {
        try {
            const [result] = await db.query("DELETE FROM pagos WHERE id = ?", [id]);
            console.log("Pago eliminado");
            return result.affectedRows > 0 
                ? { message: "Pago eliminado exitosamente." }
                : { message: "No se encontró el pago para eliminar." };
        } catch (err) {
            console.error("Error al eliminar el pago: ", err);
            throw err;
        }
    },

};

module.exports = Pagos;