import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import partyRouter from "./routes/partyRoutes.js";
import partyItemRouter from "./routes/partyItemRoutes.js";

const app = express();
const PORT = process.env.PORT;

//database connection
connectToDB();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/party", partyRouter);
app.use("/api/partyItem", partyItemRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is Running");
});
