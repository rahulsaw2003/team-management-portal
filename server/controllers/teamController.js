import Team from "../database/teamModel.js";
import validateUniqueMembers from "../utils/validateTeam.js";

export const createTeam = async (req, res) => {
	const { name, description, memberIds } = req.body;
	console.log(memberIds);
	try {
		if (!name || !description || !memberIds) {
			return res.status(200).json({ message: "All fields are required" });
		}
		const team = await Team.findOne({ name: name });
		if (team) {
			return res.status(200).json({ message: "Team name already exists in DB. Try using different name." });
		}
		const uniqueMembers = await validateUniqueMembers(memberIds);

		if (!uniqueMembers) {
			return res.status(200).json({ message: "Invalid team members" });
		}

		// Create a new team
		const newTeam = new Team({
			name,
			description,
			members: uniqueMembers,
		});

		// Save the team to the database
		const savedTeam = await newTeam.save();

		res.status(201).json({ message: "Team created successfully", team: savedTeam });
	} catch (error) {
		console.error("Error creating team:", error.message);
		res.status(500).json({ message: "Error occurred while creating team", error });
	}
};

export const getTeamDetails = async (req, res) => {
	const { id } = req.params;

	try {
		const team = await Team.findById(id).populate("members");

		if (!team) {
			return res.status(200).json({ message: "Team not found in DB" });
		}

		res.status(201).json({ message: "Team details retrieved successfully", team });
	} catch (error) {
		console.error("Error getting team details:", error.message);
		res.status(500).json({ message: "Error occurred while getting team details", error });
	}
};

export const getAllTeamDetails = async (req, res) => {
	try {
		const teams = await Team.find().populate("members");
		if (teams.length === 0) {
			return res.status(200).json({ message: "There are no teams in DB!", teams });
		}

		res.status(201).json({ message: "Team details retrieved successfully", teams });
	} catch (error) {
		console.error("Error getting team details:", error.message);
		res.status(500).json({ message: "Error occurred while getting team details", error });
	}
};

export const deleteTeam = async (req, res) => {
	const { id } = req.params;

	try {
		const team = await Team.findByIdAndDelete(id);

		if (!team) {
			return res.status(200).json({ message: "Team not found in DB" });
		}

		res.status(201).json({ message: "Team deleted successfully" });
	} catch (error) {
		console.error("Error deleting team:", error.message);
		res.status(500).json({ message: "Error occurred while deleting team", error });
	}
};
