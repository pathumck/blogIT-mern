import { Router } from "express";
import {
  addComment,
  commentCount,
  deleteComment,
  getAllComments,
  getComments,
} from "../controllers/comment.controller.js";

const CommentRoute = Router();

CommentRoute.post("/add", addComment);
CommentRoute.get("/get/:blogid", getComments);
CommentRoute.get("/get-count/:blogid", commentCount);
CommentRoute.get("/get-all-comment", getAllComments);
CommentRoute.delete("/delete/:commentid", deleteComment);

export default CommentRoute;
