const db = require('../config/db');



const Productos = {
    // Obtener todos los productos
    getAll: async() => {
        try{
            const [rows] = await db.query("SELECT * FROM productos");
            console.log("Productoses obtenidos");
            if (rows.length === 0) {
                return { message: "No se encontraron Productos." };
            }
            return rows;
        }catch(err){
            console.error("Error al obtener los Productos: ", err);
            throw err;
        }
    },
    // Obtener producto por ID
    getById: async(id) => {
        try{
            const [rows] = await db.query("SELECT * FROM productos where id = ?", [id]);
            console.log("Productos obtenidas");
            if (rows.length === 0) {
                return { message: "No se encontraron Productos." };
            }
            return rows;
        }catch(err){
            console.error("Error al obtener las Productos: ", err);
            throw err;
        }
    },
    // Crear un nuevo producto
    create: async (producto) => {
        try {
            const { nombre, descripcion, precio, cantidad, estado_reserva, fecha_creacion } = producto;
            const [result] = await db.query(        
                'INSERT INTO productos (nombre, descripcion, precio, cantidad, estado_reserva, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, descripcion, precio, cantidad, estado_reserva, fecha_creacion]    
            );
            console.log("Producto creado");
            return result.insertId;
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('nombre')) {
                return { error: "El nombre del producto ya está registrado." };
            }
            console.error("Error al crear el producto: ", err);
            throw err;
        }
    },
    // Actualizar un producto
    update: async (id, datosActualizados) => {
        try {
            const {nombre, descripcion, precio, cantidad, estado_reserva } = datosActualizados;
            const [result] = await db.query(
                "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, estado_reserva = ? WHERE id = ?",
                [nombre, descripcion, precio, cantidad, estado_reserva, id]
            );
            console.log("Producto actualizado");
            return result.affectedRows > 0 
                ? { message: "Producto actualizado exitosamente." }
                : { message: "No se encontró el producto para actualizar." };
        } catch (err) {
            console.error("Error al actualizar el producto: ", err);
            throw err;
        }
    },
    remove: async (id) => {
        try {
            const [result] = await db.query("DELETE FROM productos WHERE id = ?", [id]);
            console.log("Producto eliminado");
            return result.affectedRows > 0
                ? { message: "Producto eliminado exitosamente." }
                : { message: "No se encontró el producto para eliminar." };
        } catch (err) {
            console.error("Error al eliminar el producto: ", err);
            throw err;
        }
    },
    // Actualizar estado de reserva del producto (para admin)
    updateEstado: async (id, nuevoEstado = null) => {
        try {
            const [result] = await db.query(
                "UPDATE productos SET estado_reserva = ? WHERE id = ?",
                [nuevoEstado, id]
            );
            console.log("Estado de reserva actualizado");
            return result.affectedRows > 0
                ? { message: "Estado de reserva actualizado exitosamente." }
                : { message: "No se encontró el producto para actualizar." };
        } catch (err) {
            console.error("Error al actualizar el estado de reserva del producto: ", err);
            throw err;
        }
    },

    // Obtener productos por reserva
    getByReservaId: async (reserva_id) => {
        try {
            const [rows] = await db.query(
                "SELECT * FROM productos WHERE reserva_id = ?",
                [reserva_id]
            );
            console.log("Productos por reserva obtenidos");
            return rows.length > 0 ? rows : { message: "No se encontraron productos para esta reserva." };
        } catch (err) {
            console.error("Error al obtener productos por reserva: ", err);
            throw err;
        }
    },

     // Actualizar la cantidad de productos (solo para admin)
    updateStock: async (id, nuevaCantidad) => {
        try {
            const [result] = await db.query(
                "UPDATE productos SET cantidad = ? WHERE id = ?",
                [nuevaCantidad, id]
            );
            console.log("Cantidad de productos actualizada");
            return result.affectedRows > 0
                ? { message: "Cantidad de productos actualizada exitosamente." }
                : { message: "No se encontró el producto para actualizar." };
        } catch (err) {
            console.error("Error al actualizar la cantidad de productos: ", err);
            throw err;
        }
    },
};

module.exports = Productos;