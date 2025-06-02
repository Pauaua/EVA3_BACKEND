require('dotenv').config();
const mysql = require('mysql2/promise');

const requireEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'DB_PORT'];
requireEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error('Falta la variable de entorno: ' +envVar);
    }
});

// Pool de conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'antiguedades', 
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//Probar la conexión a la base de datos
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('¡Conexión a MySQL exitosa!');
    connection.release();
  } catch (error) {
    console.error('Error de conexión a MySQL:', error.message);
    process.exit(1); // Detener la aplicación si no hay conexión
  }
}

testConnection();

module.exports = pool;

