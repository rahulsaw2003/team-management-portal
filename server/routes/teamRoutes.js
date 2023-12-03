import express from "express";
import { createTeam, getAllTeamDetails, getTeamDetails, deleteTeam } from "../controllers/teamController.js";

const router = express.Router();

// Create a new team by selecting users from the list with unique domains and availability.
router.post("/create", createTeam);


// Get all team details.
router.get("/all", getAllTeamDetails);

router.delete("/delete/:id", deleteTeam);

// Retrieve the details of a specific team by ID.
router.get("/:id", getTeamDetails);

export default router;
