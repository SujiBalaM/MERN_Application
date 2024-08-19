import express ,{Request,Response}from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())

app.get("/api/test", async (req:Request,res:Response) => {
    res.json({message:"Hello from backend"})
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(9000, () => {
    console.log("Server is running localhost:9000")
})