import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  showCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const CategoryRoute = Router();

CategoryRoute.post("/add", addCategory);
CategoryRoute.put("/update/:categoryid", updateCategory);
CategoryRoute.get("/show/:categoryid", showCategory);
CategoryRoute.delete("/delete/:categoryid", deleteCategory);
CategoryRoute.get("/all-category", getAllCategory);

export default CategoryRoute;
