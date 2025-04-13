import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({ name, slug });

    await category.save();
    res
      .status(201)
      .json({ success: true, message: "Category added successfully." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showCategory = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find().sort({ name: 1 }).lean().exec();
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
