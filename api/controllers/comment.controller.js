import Comment from "../models/comment.model.js";
import { handleError } from "../helpers/handleError.js";

export const addComment = async (req, res, next) => {
  try {
    const { user, blogid, comment } = req.body;
    const newComment = new Comment({ user, blogid, comment });
    await newComment.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Comment added successfully.",
        comment: newComment,
      });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getComments  = async (req, res, next) => {
  try {
    const { blogid} = req.params;
    const comments = await Comment.find({ blogid }).populate("user", "name avatar").sort({ createdAt: -1 }).lean().exec();
    res
      .status(200)
      .json({
        success: true,
        data: comments,
      });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const commentCount  = async (req, res, next) => {
  try {
    const { blogid} = req.params;
    const commentCount = await Comment.countDocuments({ blogid });
    res
      .status(200)
      .json({
        success: true,
        data: commentCount,
      });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

