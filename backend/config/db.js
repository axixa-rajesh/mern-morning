import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const db = async () => await mongoose.connect(`${process.env.DB_HOST}${process.env.DB_NAME}`);
export { db, mongoose };
