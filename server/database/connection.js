import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.DB_NAME,
		});

		console.log(`MongoDB Connected Successfully at: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error in MongoDB Connection: ${error.message}`);
	}
};

export default connectDB;
