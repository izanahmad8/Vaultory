import express from "express";
import {
  addPartyItem,
  deletePartyItem,
  fetchPartyItem,
  updatePartyItem,
} from "../controller/partyItemController.js";
import authMiddleware from "../middleware/auth.js";

const partyItemRouter = express.Router();

partyItemRouter.post("/add", authMiddleware, addPartyItem);
partyItemRouter.post("/update/:id", authMiddleware, updatePartyItem);
partyItemRouter.delete("/delete/:id", authMiddleware, deletePartyItem);
partyItemRouter.get("/fetch/:partyId", authMiddleware, fetchPartyItem);

export default partyItemRouter;
