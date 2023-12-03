import User from "../database/userModel.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (users.length === 0) {
			return res.status(200).json({ message: "There are no users in DB!" });
		}
		res.status(201).json({ message: "Users retrieved successfully", users });
	} catch (error) {
		res.status(500).json({ message: "Error occured while retreiving users!", error });
	}
};

export const getOneUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(200).json({ message: "User not found in DB!" });
		}
		res.status(201).json({ message: "User retrieved successfully", user });
	} catch (error) {
		res.status(500).json({ message: "Error occured while retreiving user!", error });
	}
};

export const createUser = async (req, res) => {
	const { id, first_name, last_name, email, gender, domain, available, avatar } = req.body;
	try {
		const isUser = await User.findOne({ email });
		if (isUser) return res.status(200).json({ message: "User already exists in DB!" });

		const newUser = await User.create({ id, first_name, last_name, email, gender, domain, available, avatar });
		res.status(201).json({ message: "New User created successfully", newUser });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Error occurred while creating user!", error });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const updatedUser = req.body;

	try {
		const result = await User.updateOne({ _id: id }, updatedUser);

		if (result.modifiedCount > 0) {
			const newUser = await User.findById(id);
			res.status(201).json({ message: "User updated successfully", newUser });
		} else {
			res.status(201).json({ message: "User not found or not updated!" });
		}
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Error occurred while updating user!", error });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await User.deleteOne({ _id: id });
		if (result.deletedCount > 0) {
			res.status(201).json({ message: "User deleted successfully" });
		} else {
			res.status(201).json({ message: "User not found or not deleted!" });
		}
	} catch (error) {
		console.error("Error while deleting user:", error);
		res.status(500).json({ message: "Error occurred while deleting user!", error });
	}
};

export const getUniqueUsers = async (req, res) => {
	try {
		const users = await User.find();

		const uniqueCombinations = new Set();

		const uniqueUsers = users.filter((user) => {
			const combination = `${user.domain}-${user.available}`;

			if (!uniqueCombinations.has(combination)) {
				uniqueCombinations.add(combination);
				return true;
			}

			return false;
		});

		if (uniqueUsers.length === 0) {
			return res.status(200).json({ message: "There are no users with unique domain and availability!" });
		}

		res.status(201).json({ message: "Users with unique domain and availability retrieved successfully", uniqueUsers });
	} catch (error) {
		res.status(500).json({ message: "Error occurred while retrieving users!", error });
	}
};

