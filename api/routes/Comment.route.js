import { Router } from "express";
import {
  addComment,
  commentCount,
  getComments,
} from "../controllers/comment.controller.js";

const CommentRoute = Router();

CommentRoute.post("/add", addComment);
CommentRoute.get("/get/:blogid", getComments);
CommentRoute.get("/get-count/:blogid", commentCount);

export default CommentRoute;
