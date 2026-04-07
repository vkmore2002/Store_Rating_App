import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
  getSingleUser,
  changePassword,
  removeUser,
} from "../controllers/userController.js";

import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected routes

// admin only
router.get("/", verifyToken, authorizeRoles("admin"), getUsers);
router.delete("/:id", verifyToken, authorizeRoles("admin"), removeUser);

// authenticated users
router.get("/:id", verifyToken, getSingleUser);
router.put("/password/:id", verifyToken, changePassword);

export default router;
