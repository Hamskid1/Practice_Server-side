import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";



const app =
 express();
dotenv.config();
app.use(express.json());






const PORT = process.env.PORT || 3500;
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    app.listen(3500, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connected to MongoDB")})
.catch((err) => console.log(err));




