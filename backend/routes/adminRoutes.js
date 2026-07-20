const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/AdminMiddleware");

const {
 getAllTodosOfUsers,
  createTodoAdmin,
     getAllTodosAdmin,
    updateTodoAdmin, 
    deleteTodoAdmin
}= require("../controllers/adminController")


// admin
router.post("/admin/create", authMiddleware, isAdmin, createTodoAdmin);

router.get("/admin/all", authMiddleware, isAdmin, getAllTodosAdmin);
router.put("/admin/:id", authMiddleware, isAdmin, updateTodoAdmin);
router.delete("/admin/:id", authMiddleware, isAdmin, deleteTodoAdmin);
router.get("/admin/users", authMiddleware, isAdmin, getAllUsers);
module.exports = router;