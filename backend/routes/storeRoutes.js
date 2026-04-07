import express from "express";

import {
  addStore,
  getStores,
  getSingleStore,
  getOwnerStores,
  removeStore,
} from "../controllers/storeController.js";

import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin
router.post("/", verifyToken, authorizeRoles("admin"), addStore);
router.delete("/:id", verifyToken, authorizeRoles("admin"), removeStore);

// store owner (must be before /:id to match correctly)
router.get(
  "/owner/my-stores",
  verifyToken,
  authorizeRoles("owner"),
  getOwnerStores,
);

// all authenticated users
router.get("/", verifyToken, getStores);
router.get("/:id", verifyToken, getSingleStore);

export default router;
