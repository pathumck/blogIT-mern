import {Router} from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import { onlyadmin } from "../middleware/onlyadmin.js";
import { authenticate } from "../middleware/authenticate.js";

const UserRoute = Router();

UserRoute.get("/get-user/:userid",authenticate, getUser);
UserRoute.put("/update-user/:userid", authenticate, upload.single('file'), updateUser);
UserRoute.get("/get-all-user", onlyadmin, getAllUsers);
UserRoute.delete("/delete/:id", onlyadmin, deleteUser);

export default UserRoute;