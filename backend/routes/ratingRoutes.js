import express from "express";

import {
  submitRating,
  getStoreRatings,
  getMyRating,
  removeRating,
} from "../controllers/ratingController.js";

import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// user
router.post("/", verifyToken, authorizeRoles("user"), submitRating);
router.get("/my/:storeId", verifyToken, authorizeRoles("user"), getMyRating);

// owner/admin
router.get(
  "/store/:storeId",
  verifyToken,
  authorizeRoles("owner", "admin"),
  getStoreRatings,
);

// admin
router.delete("/:id", verifyToken, authorizeRoles("admin"), removeRating);

export default router;
