import itemModel from "../models/itemModels.js";
import { itemSchema } from "../config/authValidation.js";

//add items to inventory

const addItem = async (req, res) => {
  const { itemName, size, price, quantity, buyPrice, discount } = req.body;
  const userId = req.userId;
  const { error } = itemSchema.validate({
    itemName,
    size,
    price,
    quantity,
    buyPrice,
    discount,
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const newItem = new itemModel({
      userId,
      itemName,
      size,
      price,
      quantity,
      buyPrice,
      discount,
    });
    const savedItem = await newItem.save();
    res.status(200).json({
      success: true,
      message: "Item added successfully",
      item: savedItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//delete items from inventory

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await itemModel.findByIdAndDelete(id);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      item: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//update specific item

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, size, price, quantity, buyPrice, discount } = req.body;
  const { error } = itemSchema.validate({
    itemName,
    size,
    price,
    quantity,
    buyPrice,
    discount,
  });
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  try {
    const Item = await itemModel.findById(id);
    if (!Item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    Item.itemName = itemName;
    Item.size = size;
    Item.price = price;
    Item.quantity = quantity;
    Item.buyPrice = buyPrice;
    Item.discount = discount;

    const updateItem = await Item.save();
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updateItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//fetch all items

const fetchItem = async (req, res) => {
  const userId = req.userId;

  try {
    const items = await itemModel.find({ userId });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addItem, deleteItem, updateItem, fetchItem };
