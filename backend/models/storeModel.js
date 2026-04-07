import db from "../config/db.js";

// create store
export const createStore = (storeData, callback) => {
  const { name, email, address, owner_id } = storeData;

  const query = `
    INSERT INTO stores (name, email, address, owner_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, email, address, owner_id], callback);
};

// get all stores
export const getAllStores = (callback) => {
  const query = `
    SELECT s.id, s.name, s.email, s.address,
    IFNULL(AVG(r.rating), 0) AS rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `;

  db.query(query, callback);
};

// get store by id
export const getStoreById = (id, callback) => {
  const query = `
    SELECT s.id, s.name, s.email, s.address,
    IFNULL(AVG(r.rating), 0) AS rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.id = ?
    GROUP BY s.id
  `;

  db.query(query, [id], callback);
};

// get stores by owner
export const getStoresByOwner = (ownerId, callback) => {
  const query = `
    SELECT s.id, s.name, s.email, s.address,
    IFNULL(AVG(r.rating), 0) AS rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.owner_id = ?
    GROUP BY s.id
  `;

  db.query(query, [ownerId], callback);
};

// delete store
export const deleteStore = (id, callback) => {
  const query = `DELETE FROM stores WHERE id = ?`;

  db.query(query, [id], callback);
};
