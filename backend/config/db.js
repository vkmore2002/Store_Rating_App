import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool (better than single connection)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // IMPORTANT
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test connection and handle errors
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  } else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});

export default db.promise();
