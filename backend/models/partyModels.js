import mongoose from "mongoose";

const partySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    partyName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    PartyType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const partyModel =
  mongoose.models.party || mongoose.model("party", partySchema);

export default partyModel;
