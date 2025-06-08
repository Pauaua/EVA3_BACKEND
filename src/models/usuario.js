const db = require('../config/db');

const Usuarios = {
    getAll: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM usuarios');
            //console.log("Usuarios obtenidos");
            if (rows.length === 0) {
                return { message: "No se encontraron usuarios." };
            }
            return rows;
        } catch (err) {
            console.error("Error al obtener los usuarios: ", err);
            throw err;
        }
    },
    getById: async (usuario) => {
        try {
            const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [usuario.id]);
            //console.log("Usuarios obtenidos");
            if (rows.length === 0) {
                return { message: "No se encontraron usuarios." };
            }
            return rows;
        } catch (err) {
            console.error("Error al obtener los usuarios: ", err);
            throw err;
        }
    },
    create: async (usuario) => {
        try {
            const [rows] = await db.query(
            'INSERT INTO usuarios (nombre, apellido, email, password, rol, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [usuario.nombre, usuario.apellido, usuario.email, usuario.password, usuario.rol, usuario.telefono, usuario.direccion]
        );
        if (rows.affectedRows > 0) {
            return { message: "Usuario creado exitosamente." };
        }
        return { error: "No se pudo crear el usuario." };
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('email')) {
                return { error: "El correo electrónico ya está registrado." };
            }
            console.error("Error al crear el usuario: ", err);
            throw err;
        }
    },
    update: async (usuario) => {
        try {
            const [rows] = await db.query(
                "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, password = ?, rol = ?, telefono = ?, direccion = ? WHERE email = ?",
                [usuario.nombre, usuario.apellido, usuario.email_nuevo, usuario.password, usuario.rol, usuario.email, usuario.telefono, usuario.direccion]
            );
            console.log("Usuario actualizado");
            if (rows.affectedRows > 0) {
                return { message: "Usuario actualizado exitosamente." };
            }
            return rows;
        } catch (err) {
            console.error("Error al actualizar el usuario: ", err);
            throw err;
        }
    },
    remove: async (usuario) => {
        try {
            const [rows] = await db.query(
                "DELETE FROM usuarios WHERE email = ?",
                [usuario.email]
            );
            console.log("Usuario eliminado");
            if (rows.affectedRows > 0) {
                return { message: "Usuario eliminado exitosamente." };
            } else if (rows.affectedRows === 0) {
                return { message: "No se encontró el usuario." };
            }
            return rows;
        } catch (err) {
            console.error("Error al eliminar el usuario: ", err);
            throw err;
        }
    },
    desactiveUser: async (usuario) => {
        try {
            // LOGIN
            const [rows] = await db.query(
                "SELECT * FROM usuarios WHERE email = ? and password = ?",
                [usuario.email, usuario.password]
            );
            if (rows.length > 0) {
                // VALIDAMOS ROL y el estado del Reclutador 
                if (rows[0].rol === "admin" && rows[0].estado === "Activo") {
                    // ACTUALIZAMOS ESTADO
                    const [update] = await db.query(
                        "UPDATE usuarios SET estado = ? WHERE email = ?",
                        [usuario.estado, usuario.email_modificar]
                    );
                    if (update.affectedRows === 1) {
                        return { message: `Usuario ${usuario.email_modificar} actualizado exitosamente.` };
                    }
                    return update;
                } else {
                    return { message: "Usuario no es administrador/a activo o no tiene permisos." };
                }
            }
            return { message: "Usuario no encontrado o credenciales incorrectas." };
        } catch (err) {
            console.error("Error al actualizar el usuario: ", err);
            throw err;
        }
    },
};

module.exports = Usuarios;