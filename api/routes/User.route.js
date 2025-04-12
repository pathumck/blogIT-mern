import {Router} from "express";
import { getUser } from "../controllers/user.controller.js";

const UserRoute = Router();

UserRoute.get("/get-user/:userid", getUser);

export default UserRoute;