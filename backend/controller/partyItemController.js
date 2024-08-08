import partyItemModel from "../models/partyItemModels.js";
import { partyItemSchema } from "../config/authValidation.js";

//add partyItem

const addPartyItem = async (req, res) => {
  const {
    partyId,
    itemName,
    size,
    price,
    sellPrice,
    quantity,
    discount,
    date,
  } = req.body;

  const { error } = partyItemSchema.validate({
    itemName,
    size,
    price,
    sellPrice,
    quantity,
    discount,
    date,
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const newItem = new partyItemModel({
      partyId,
      itemName,
      size,
      price,
      sellPrice,
      quantity,
      discount,
      date,
    });

    const savedItem = await newItem.save();

    res.status(200).json({
      success: true,
      message: "Item Added Successfully",
      partyItem: savedItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//update partyItem

const updatePartyItem = async (req, res) => {};

//delete partyItem

const deletePartyItem = async (req, res) => {};

//fetch partyItem

const fetchPartyItem = async (req, res) => {};

export { addPartyItem, updatePartyItem, deletePartyItem, fetchPartyItem };
