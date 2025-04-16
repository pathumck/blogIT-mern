import { handleError } from "../helpers/handleError.js";
export const blogLike = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};