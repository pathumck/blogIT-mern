import User from "../models/user.model.js";
import { handleError } from "../helpers/handleError.js";
export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid });
    if (!user) {
      next(handleError(404, "User not found."));
    }
    res.status(200).json({ success: true, message: "User found.", user });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
