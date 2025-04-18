import { Router } from "express";
import { doLike, likeCount } from "../controllers/bloglike.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const BlogLikeRoute = Router();

BlogLikeRoute.post("/do-like", authenticate, doLike);
BlogLikeRoute.get("/get-like/:blogid", likeCount);

export default BlogLikeRoute;
