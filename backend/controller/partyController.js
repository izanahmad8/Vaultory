import partyModel from "../models/partyModels.js";
import { partySchema } from "../config/authValidation.js";

//add party

const addParty = async (req, res) => {
  const userId = req.userId;
  const { partyName, phoneNumber, address, partyType } = req.body;

  const { error } = partySchema.validate({
    partyName,
    phoneNumber,
    address,
    partyType,
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const newParty = new partyModel({
      userId,
      partyName,
      phoneNumber,
      address,
      partyType,
    });

    const savedParty = await newParty.save();
    res.status(200).json({
      success: true,
      message: "Party added successfully",
      party: savedParty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//delete party

const deleteParty = async (req, res) => {
  const { id } = req.params;
  try {
    const party = await partyModel.findByIdAndDelete(id);

    if (!party) {
      return res
        .status(404)
        .json({ success: false, message: "party not found" });
    }

    res.status(200).json({
      success: true,
      message: "party deleted successfully",
      party: party,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//update party

const updateParty = async (req, res) => {
  const { id } = req.params;
  const { partyName, phoneNumber, address, partyType } = req.body;

  const { error } = partySchema.validate({
    partyName,
    phoneNumber,
    address,
    partyType,
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const party = await partyModel.findById(id);
    if (!party) {
      return res
        .status(404)
        .json({ success: false, message: "party not found" });
    }

    party.partyName = partyName;
    party.phoneNumber = phoneNumber;
    party.address = address;
    party.partyType = partyType;

    const savedParty = await party.save();
    res.status(200).json({
      success: true,
      message: "Party updated successfully",
      party: savedParty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//fetch all party

const fetchParty = async (req, res) => {
  const userId = req.userId;

  try {
    const party = await partyModel.find({ userId });

    res.status(200).json({
      success: true,
      party,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addParty, deleteParty, updateParty, fetchParty };
