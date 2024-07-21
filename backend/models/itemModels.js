import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default itemModel;
