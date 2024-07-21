import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addItem,
  deleteItem,
  fetchItem,
  updateItem,
} from "../controller/itemController.js";

const itemRouter = express.Router();

itemRouter.post("/add", authMiddleware, addItem);
itemRouter.get("/fetch", authMiddleware, fetchItem);
itemRouter.post("/update/:id", authMiddleware, updateItem);
itemRouter.delete("/delete/:id", authMiddleware, deleteItem);

export default itemRouter;
