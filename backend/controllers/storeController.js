import {
  createStore,
  getAllStores,
  getStoreById,
  getStoresByOwner,
  deleteStore,
} from "../models/storeModel.js";

// create store (admin)
export const addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  if (!name || !address || !owner_id) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  createStore({ name, email, address, owner_id }, (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({ message: "Store created successfully" });
  });
};

// get all stores
export const getStores = (req, res) => {
  getAllStores((err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// get store by id
export const getSingleStore = (req, res) => {
  const { id } = req.params;

  getStoreById(id, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(results[0]);
  });
};

// get stores for owner
export const getOwnerStores = (req, res) => {
  const ownerId = req.user.id;

  getStoresByOwner(ownerId, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// delete store (admin)
export const removeStore = (req, res) => {
  const { id } = req.params;

  deleteStore(id, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Store deleted successfully" });
  });
};
