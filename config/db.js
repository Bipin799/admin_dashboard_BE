const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "3366",
  database: process.env.DB_NAME || "admin_dashboard",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Test the pool connection
(async () => {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    
    // Test the connection
    await connection.ping();
    console.log('✅ Successfully connected to MySQL database pool');
    
    // Optional: Run a test query
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('Test query result:', rows[0].result);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    
    // Detailed error diagnostics
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Authentication failed. Check your username/password');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error(`Database "${pool.config.connectionConfig.database}" does not exist`);
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused. Is MySQL running?');
    }
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
})();

// Export the pool for use in other modules
module.exports = pool;