const jwt= require("jsonwebtoken")
generateTokenAndSetCookie = (user,res)=>{


const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

      
        res.cookie("token", token, {
            httpOnly: true
        });

}

module.exports= generateTokenAndSetCookie;