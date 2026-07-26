const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken.js");

// register
const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }


const existingUser = await User.findOne({email});
console.log("Email received:", email);
console.log("Existing user found:", existingUser);
if(existingUser){
    return res.status(400).json({
        success:false,
        message:"Email already in use"
        
    })
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({
    name,
    email,
    password: hashedPassword
});

generateToken(user,res);
        return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data:{
            id: user._id,
        name: user.name,
        email: user.email   
        }
    });

};
// loginn
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

       
        generateToken(user,res)
        return res.status(200).json({
            success: true,
            message: "Login successful"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const logout = async (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};

const profile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
module.exports= {
    register,
    login,
    logout,
    profile
}