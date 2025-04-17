import { Router } from "express";
import { doLike, likeCount } from "../controllers/bloglike.controller.js";

const BlogLikeRoute = Router();

BlogLikeRoute.post("/do-like", doLike);
BlogLikeRoute.get("/get-like/:blogid", likeCount);

export default BlogLikeRoute;
