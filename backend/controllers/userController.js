import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUserById,
  updateUserPassword,
  deleteUser,
} from "../models/userModel.js";

dotenv.config();

// REGISTER (Normal User)

export const registerUser = (req, res) => {
  const { name, email, password, address } = req.body;

  // Basic validation
  if (!name || !email || !password || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        address,
        role: "user",
      };

      createUser(newUser, (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
          message: "User registered successfully",
        });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

// LOGIN (All roles)

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

// GET ALL USERS (Admin)

export const getUsers = (req, res) => {
  getAllUsers((err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// GET USER BY ID

export const getSingleUser = (req, res) => {
  const { id } = req.params;

  getUserById(id, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
};

// UPDATE PASSWORD

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "Password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    updateUserPassword(id, hashedPassword, (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Password updated successfully" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE USER (Admin)

export const removeUser = (req, res) => {
  const { id } = req.params;

  deleteUser(id, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "User deleted successfully" });
  });
};
