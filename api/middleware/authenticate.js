import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";
export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    if (!token) {
      return next(handleError(403, "Unauthorized"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    console.log(req.user);
    next();
  } catch (error) {
    next(handleError(403, error.message));
  }
};
