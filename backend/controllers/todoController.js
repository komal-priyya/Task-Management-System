 const Todo = require("../models/todoModel");      
const User = require("../models/userModel");




 const createTodo = async (req, res) => {
    try {

        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo = await Todo.create({
            title,
            description,
            status,
            user: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",

            data: todo,
            
            
        });alert("todo created successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json({
           
            success: false,
            message: error.message
        });

    } 
};



const getAllTodos = async (req, res) => {
    try {

        const todos = await Todo.find({
            user: req.user._id
        });

      

        return res.status(200).json({
            success:true,
           data:todos
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//  Single Todo
const getSingleTodo = async (req, res) => {
    try {

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        return res.status(200).json({
            success: true,
            data: todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Todo
const updateTodo = async (req, res) => {
    try {

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const { title, description, status } = req.body;

        if (title !== undefined) {
            todo.title = title;
        }

        if (description !== undefined) {
            todo.description = description;
        }

        if (status !== undefined) {
            todo.status = status;
        }

        await todo.save();

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Todo
const deleteTodo = async (req, res) => {
    try {

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await todo.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('name email role');
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createTodo,
    getAllTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,
    getAllUsers,
};