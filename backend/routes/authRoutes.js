const express = require("express");
const router = express.Router();
const authMiddleware=require("../middleware/authmiddleware.js")
const {
    register,
    login,
    logout,
    profile
} = require("../controllers/authController.js");


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",authMiddleware,profile)

module.exports = router;