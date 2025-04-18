import User from "../models/user.model.js";
import { handleError } from "../helpers/handleError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid });
    if (!user) {
      next(handleError(404, "User not found."));
    }
    res.status(200).json({ success: true, message: "User found.", user });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;
    const user = await User.findById({ _id: userid });
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;
    if (data.password && data.password.length >= 8) {
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "mern-blog", resource_type: "auto" })
        .catch((error) => {
          nert(handleError(500, error.message));
        });
      user.avatar = uploadResult.secure_url;
    }
    await user.save();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      message: "User updated.",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "Users found.", data: users });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
