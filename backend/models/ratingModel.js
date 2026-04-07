import db from "../config/db.js";

// add or update rating
export const upsertRating = (userId, storeId, rating, callback) => {
  const query = `
    INSERT INTO ratings (user_id, store_id, rating)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE rating = VALUES(rating)
  `;

  db.query(query, [userId, storeId, rating], callback);
};

// get ratings for a store
export const getRatingsByStore = (storeId, callback) => {
  const query = `
    SELECT r.id, r.rating, r.created_at,
           u.id AS user_id, u.name, u.email
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    WHERE r.store_id = ?
  `;

  db.query(query, [storeId], callback);
};

// get rating by user for a store
export const getUserRatingForStore = (userId, storeId, callback) => {
  const query = `
    SELECT * FROM ratings
    WHERE user_id = ? AND store_id = ?
  `;

  db.query(query, [userId, storeId], callback);
};

// delete rating
export const deleteRating = (id, callback) => {
  const query = `DELETE FROM ratings WHERE id = ?`;

  db.query(query, [id], callback);
};
