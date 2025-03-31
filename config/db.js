const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "3366",
  database: "admin_dashboard",
  waitForConnections: true,
  connectionLimit: 10, // Maximum connections
  queueLimit: 0,
});

// Check database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool;
