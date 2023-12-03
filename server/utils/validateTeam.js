import User from "../database/userModel.js";

const validateUniqueMembers = async (memberIds) => {
	try {
		const users = await User.find({ _id: { $in: memberIds } });

		const uniqueCombinations = new Set();
		const uniqueMembers = [];

		for (const user of users) {
			const combination = `${user.domain}-${user.available}`;

			if (!uniqueCombinations.has(combination)) {
				uniqueCombinations.add(combination);
				uniqueMembers.push(user._id);
			}
		}

		return uniqueMembers;
	} catch (error) {
		console.error("Error validating unique members:", error);
		throw error;
	}
};

export default validateUniqueMembers;
