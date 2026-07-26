const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/AdminMiddleware");

const {
    createTodo,
    getAllTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,
    
    getAllUsers,
    
} = require("../controllers/todoController");



// user
router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getAllTodos);
// router.get("/users/:id",authMiddleware,getAllTodosOfUsers)
router.get("/:id", authMiddleware, getSingleTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);


module.exports = router;