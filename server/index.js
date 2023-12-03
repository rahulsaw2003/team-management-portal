import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import connectDB from './database/connection.js';
import userRouter from './routes/userRoutes.js';
import teamRouter from "./routes/teamRoutes.js";

const app = express();
config({path: './.env'});

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
connectDB();

// User Routes
app.use("/api/users", userRouter);

// Team Routes
app.use("/api/teams", teamRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Team Management Server");
});


app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
