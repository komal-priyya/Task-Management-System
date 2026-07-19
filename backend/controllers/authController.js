const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = require("../utils/genertateToken.js");
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
if(existingUser){
    return res.status(400).json({
        success:false,
        message:"user already exists"
        
    })
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({
    name,
    email,
    password: hashedPassword
});

generateTokenAndSetCookie(user,res);
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

       
        generateTokenAndSetCookie(user,res)
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
const profile = async (req, res) => {
    try{
    res.json({
        success: true,
        data: {
            name: req.user.name,
            email: req.user.email
        }
    });

    

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const logout = async (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};


module.exports= {
    register,
    login,
    logout,
    profile
}
