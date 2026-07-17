const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    try {
       
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first."
            });
        }

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

       
        req.user = user;

       
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = authMiddleware;  


module.exports = authMiddleware;  
