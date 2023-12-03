import express from 'express';
import { createUser, getAllUsers, getOneUser, updateUser, deleteUser, getUniqueUsers } from "../controllers/userController.js";

const router = express.Router();

// Retrieve all users with pagination support.
router.get("/", getAllUsers);

// GET users with unique domains and availability.
router.get("/unique", getUniqueUsers);

// Create a new user.
router.post("/create", createUser);


// Retrieve a specific user by ID.
router.get("/:id", getOneUser);


// Update an existing user.
router.put("/update/:id", updateUser);

// Delete a user.
router.delete("/delete/:id", deleteUser);



export default router;