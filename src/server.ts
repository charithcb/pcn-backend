import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("PCN backend is running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
});


