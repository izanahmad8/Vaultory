import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT;

//database connection
connectToDB();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is Running");
});
