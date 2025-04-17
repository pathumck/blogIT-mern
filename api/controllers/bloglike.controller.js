import { handleError } from "../helpers/handleError.js";
import BlogLike from "../models/bloglike.model.js";

export const doLike = async (req, res, next) => {
  try {
    const { userid, blogid } = req.body;

    let like = await BlogLike.findOne({ userid, blogid });

    if (!like) {
      like = await new BlogLike({ userid, blogid }).save();
    } else {
      await BlogLike.findByIdAndDelete(like._id);
    }

    const likecount = await BlogLike.countDocuments({ blogid });

    res.status(200).json({ likecount });
  } catch (error) {
    console.log(error);
    next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const { userid } = req.query;

    const likecount = await BlogLike.countDocuments({ blogid });

    let isUserliked = false;
    if (userid) {
      isUserliked = await BlogLike.findOne({ userid, blogid });
      isUserliked = isUserliked ? true : false;
    }

    res.status(200).json({
      likecount,
      isUserliked,
    });
  } catch (error) {
    console.log(error);
    next(handleError(500, error.message));
  }
};
