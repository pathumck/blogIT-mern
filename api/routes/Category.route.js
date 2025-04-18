import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  showCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { onlyadmin } from "../middleware/onlyadmin.js";

const CategoryRoute = Router();

CategoryRoute.post("/add", onlyadmin, addCategory);
CategoryRoute.put("/update/:categoryid", onlyadmin, updateCategory);
CategoryRoute.get("/show/:categoryid", onlyadmin, showCategory);
CategoryRoute.delete("/delete/:categoryid", onlyadmin, deleteCategory);
CategoryRoute.get("/all-category", getAllCategory);

export default CategoryRoute;
