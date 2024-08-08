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

const updatePartyItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, size, price, sellPrice, quantity, discount, date } =
    req.body;
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
    const partyItem = await partyItemModel.findById(id);
    if (!partyItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    partyItem.itemName = itemName;
    partyItem.size = size;
    partyItem.price = price;
    partyItem.sellPrice = sellPrice;
    partyItem.quantity = quantity;
    partyItem.discount = discount;
    partyItem.date = date;

    const updateItem = await partyItem.save();
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      partyItem: updateItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//delete partyItem

const deletePartyItem = async (req, res) => {
  const { id } = req.params;
  try {
    const partyItem = await partyItemModel.findByIdAndDelete(id);
    if (!partyItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      partyItem: partyItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//fetch partyItem

const fetchPartyItem = async (req, res) => {
  const { partyId } = req.params;
  try {
    const partyItem = await partyItemModel.find({ partyId });
    if (partyItem.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found for this party" });
    }
    res.status(200).json({
      success: true,
      message: "Item fetched successfull",
      partyItem: partyItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addPartyItem, updatePartyItem, deletePartyItem, fetchPartyItem };
