import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const ProtectRoute = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    // Allow header token as fallback
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No Token Found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token', error: error.message });
  }
};
