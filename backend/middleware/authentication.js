import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authentication = (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Please sign in" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message:
        "Token is expired or could not be verified or Signed Out - Sign in again",
    });
  }
};

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: 604800, // 1 week
  });
};

const destroyToken = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Token destroyed/Signed Out" });
};

const isAdmin = (req, res, next) => {
  if (req.user.user && req.user.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized - Admin only" });
  }
};

export { authentication, generateToken, destroyToken, isAdmin };
