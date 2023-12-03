import mongoose from "mongoose";


const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required."],
		trim: true,
		unique: true,
	},
	description: {
		type: String,
        required: [true, "Description is required."],
	},
	members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Member is required."],
        }
    ],
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
