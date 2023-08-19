import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
