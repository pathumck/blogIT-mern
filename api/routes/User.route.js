import {Router} from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import upload from "../config/multer.js";

const UserRoute = Router();

UserRoute.get("/get-user/:userid", getUser);
UserRoute.put("/update-user/:userid", upload.single('file'), updateUser);
UserRoute.get("/get-all-user", getAllUsers);
UserRoute.delete("/delete/:id", deleteUser);

export default UserRoute;