import { handleError } from "../helpers/handleError.js";
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import { encode } from "entities";
import Category from "../models/category.model.js";

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
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);

    let featuredImage = data.featuredImage || "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "mern-blog", resource_type: "auto" })
        .catch((error) => {
          return next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogid, {
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage,
      blogContent: encode(data.blogContent),
    });

    if (!updatedBlog) {
      return next(handleError(404, "Blog not found"));
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
    });
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
    const user = req.user;
    let blog;
    if (user.role === "admin") {
      blog = await Blog.find()
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    } else {
      blog = await Blog.find({ author: user._id })
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getRelatedBlog = async (req, res, next) => {
  try {
    console.log(req.params);
    const { category, blog } = req.params;
    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      next(handleError(404, "Category not found."));
    }
    const categoryId = categoryData._id;
    const relatedBlog = await Blog.find({
      category: categoryId,
      slug: { $ne: blog },
    })
      .lean()
      .exec();
    console.log(blog);
    res.status(200).json({ success: true, data: relatedBlog });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      next(handleError(404, "Category data not found."));
    }
    const categoryId = categoryData._id;
    const blogs = await Blog.find({
      category: categoryId,
    })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    const blogs = await Blog.find({
      title: { $regex: q, $options: "i" },
    })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
