import { handleError } from "../helpers/handleError.js";
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import { encode } from "entities";

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "mern-blog", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }
    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage,
      blogContent: encode(data.blogContent),
    });
    await blog.save();
    res
      .status(201)
      .json({ success: true, message: "Blog added successfully." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid).populate("category", "name");
    if (!blog) {
      next(handleError(404, "Blog not found."));
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const updateBlog = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);
    res
      .status(201)
      .json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find()
      .populate("author", "name avatar role")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
