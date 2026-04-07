import db from "../config/db.js";

// Create User
export const createUser = (userData, callback) => {
  const { name, email, password, address, role } = userData;

  const query = `
    INSERT INTO users (name, email, password, address, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, email, password, address, role], callback);
};

// Find user by email (for login)
export const findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [email], callback);
};

// Get all users (Admin)
export const getAllUsers = (callback) => {
  const query = `
    SELECT id, name, email, address, role, created_at
    FROM users
  `;

  db.query(query, callback);
};

// Get user by ID
export const getUserById = (id, callback) => {
  const query = `
    SELECT id, name, email, address, role, created_at
    FROM users WHERE id = ?
  `;

  db.query(query, [id], callback);
};

// Update password
export const updateUserPassword = (id, newPassword, callback) => {
  const query = `
    UPDATE users SET password = ? WHERE id = ?
  `;

  db.query(query, [newPassword, id], callback);
};

// Delete user (Admin)
export const deleteUser = (id, callback) => {
  const query = `DELETE FROM users WHERE id = ?`;

  db.query(query, [id], callback);
};
