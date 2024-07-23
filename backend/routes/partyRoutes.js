import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addParty,
  deleteParty,
  fetchParty,
  updateParty,
} from "../controller/partyController.js";

const partyRouter = express.Router();

partyRouter.post("/add", authMiddleware, addParty);
partyRouter.delete("/delete/:id", authMiddleware, deleteParty);
partyRouter.post("/update/:id", authMiddleware, updateParty);
partyRouter.get("/fetch", authMiddleware, fetchParty);

export default partyRouter;
