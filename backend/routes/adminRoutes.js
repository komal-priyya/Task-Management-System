const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const isAdmin = require("../middleware/AdminMiddleware");

const {profile}=require("../controllers/authController")
const {
 getAllTodosOfUsers,
  createTodoAdmin,

     getAllTodosAdmin,
    updateTodoAdmin, 
    deleteTodoAdmin,
    getAllUsers
}= require("../controllers/adminController")



// admin
router.post("/todos/create", authMiddleware, isAdmin, createTodoAdmin);

router.get("/todos/all", authMiddleware, isAdmin, getAllTodosAdmin);
router.put("/todos/:id", authMiddleware, isAdmin, updateTodoAdmin);
router.delete("/todos/:id", authMiddleware, isAdmin, deleteTodoAdmin);
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/profile", authMiddleware, isAdmin, profile);
module.exports = router;