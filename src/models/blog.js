const db = require("../config/db");

const Blog = {

    //Obtener todas las entradas del blog
    getAll: async () => {
        try {
            const [rows] = await db.query("SELECT * FROM blog");
            console.log("Entradas del blog obtenidas");
            if (rows.length === 0) {
                return { message: "No se encontraron entradas del blog." };
            }
            return rows;
        } catch (err) {
            console.error("Error al obtener las entradas del blog: ", err);
            throw err;
        }
    },
    //Obtener entrada del blog por ID
    getById: async (id) => {
        try {
            const [rows] = await db.query("SELECT * FROM blog WHERE id = ?", [id]);
            console.log("Entrada del blog obtenida");
            if (rows.length === 0) {
                return { message: "No se encontró la entrada del blog." };
            }
            return rows[0];
        } catch (err) {
            console.error("Error al obtener la entrada del blog: ", err);
            throw err;
        }
    },

    // Crear una nueva entrada del blog
    create: async (entrada) => {
        try {
            const { titulo, resumen, creado_por, cuerpo_texto, referencia, fecha_publicacion } = entrada;
            const [result] = await db.query(
                'INSERT INTO blog (titulo, resumen, creado_por, cuerpo_texto, referencia, fecha_publicacion) VALUES (?, ?, ?, ?, ?, ?)',
                [titulo, resumen, creado_por, cuerpo_texto, referencia, fecha_publicacion]
            );
            console.log("Entrada del blog creada");
            return result.insertId;
        } catch (err) {
            console.error("Error al crear la entrada del blog: ", err);
            throw err;
        }
    },
    //Actualizar una entrada del blog
    update: async (id, datosActualizados) => {
        try {
            const { titulo, resumen, creado_por, cuerpo_texto, referencia, fecha_publicacion } = datosActualizados;
            const [result] = await db.query(
                "UPDATE blog SET titulo = ?, resumen = ?, creado_por = ?, cuerpo_texto = ?, referencia = ?, fecha_publicacion = ? WHERE id = ?",
                [titulo, resumen, creado_por, cuerpo_texto, referencia, fecha_publicacion, id]
            );
            console.log("Entrada del blog actualizada");
            return result.affectedRows > 0 
                ? { message: "Entrada del blog actualizada exitosamente." }
                : { message: "No se encontró la entrada del blog para actualizar." };
        } catch (err) {
            console.error("Error al actualizar la entrada del blog: ", err);
            throw err;
        }
    },
    // Eliminar una entrada del blog
    remove: async (id) => {
        try {
            const [result] = await db.query("DELETE FROM blog WHERE id = ?", [id]);
            console.log("Entrada del blog eliminada");
            return result.affectedRows > 0
                ? { message: "Entrada del blog eliminada exitosamente." }
                : { message: "No se encontró la entrada del blog para eliminar." };
        } catch (err) {
            console.error("Error al eliminar la entrada del blog: ", err);
            throw err;
        }
    },
    // Desactivar una entrada del blog
    deactivateEntry: async (id, titulo) => {
        try {
            let query = "UPDATE blog SET estado = 0 WHERE ";
            let params = [];

            if (id) {
                query += "id = ?";
                params.push(id);
            } else if (titulo) {
                query += "titulo = ?";
                params.push(titulo);
            } else {
                throw new Error("Se debe proporcionar un ID o un título para desactivar la entrada del blog.");
            }

            const [result] = await db.query(query, params);

            console.log("Entrada del blog desactivada");
            return result.affectedRows > 0
                ? { message: "Entrada del blog desactivada exitosamente." }
                : { message: "No se encontró la entrada del blog para desactivar." };
        } catch (err) {
            console.error("Error al desactivar la entrada del blog: ", err);
            throw err;
        }
    }

};

module.exports = Blog;