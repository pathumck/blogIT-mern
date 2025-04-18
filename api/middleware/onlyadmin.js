import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";
export const onlyadmin = (req, res, next) => {
  const token  = req.cookies.access_token;
  try {
    if (!token) {
      return next(handleError(403, "Unauthorized"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== "admin") {
      return next(handleError(403, "Unauthorized"));
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    next(handleError(403, error.message));
  }
};
