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
    getAllTodosOfUsers,
    getAllUsers,
    createTodoAdmin,
     getAllTodosAdmin,
    updateTodoAdmin, 
    deleteTodoAdmin
} = require("../controllers/todoController");


// user
router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getAllTodos);
router.get("/users/:id",authMiddleware,getAllTodosOfUsers)
router.get("/:id", authMiddleware, getSingleTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

// admin
router.post("/admin/create", authMiddleware, isAdmin, createTodoAdmin);

router.get("/admin/all", authMiddleware, isAdmin, getAllTodosAdmin);
router.put("/admin/:id", authMiddleware, isAdmin, updateTodoAdmin);
router.delete("/admin/:id", authMiddleware, isAdmin, deleteTodoAdmin);
router.get("/admin/users", authMiddleware, isAdmin, getAllUsers);
module.exports = router;