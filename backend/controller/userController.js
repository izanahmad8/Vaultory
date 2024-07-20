import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthSchema, LoginAuthSchema } from "../config/authValidation.js";

//token generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//register user
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = AuthSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);
    res
      .status(201)
      .json({ success: true, message: "User Registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//login user
const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = LoginAuthSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email doesn't exists" });
    }
    console.log(password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Enter the correct password",
      });
    }

    const token = generateToken(user._id);
    res
      .status(201)
      .json({ success: true, message: "Login successfull", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { signup, login };
