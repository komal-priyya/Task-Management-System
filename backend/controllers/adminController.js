 const Todo = require("../models/todoModel");      
const User = require("../models/userModel");


const createTodoAdmin = async (req, res) => {
    try {
        const { title, description, status, userId } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required to create todo for a user"
            });
        }

        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "Target user not found"
            });
        }

        const todo = await Todo.create({
            title,
            description,
            status,
            user: userId
        });

        return res.status(201).json({
            success: true,
            message: "Todo created for user by admin",
            data: todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllTodosOfUsers= async(req,res)=>{
    try{
     console.log("User ID from URL:", req.params.id);
    const todos = await Todo.find({
        user:req.params.id
    })
console.log("Todos:", todos);
    if(todos.length==0){
        return res.status(401).json({
            success:false,
            message:"unauthorisation"
        })
    }


   if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
return res.status(200).json({
    success:true,
    data:todos
})
    }catch(error){
        console.error(error.message)
    }
}
const getAllTodosAdmin = async (req, res) => {
    try {
        const todos = await Todo.find().populate('user', 'name email');
        return res.status(200).json({
            success: true,
            data: todos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateTodoAdmin = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        const { title, description, status } = req.body;

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (status !== undefined) todo.status = status;

        await todo.save();

        return res.status(200).json({
            success: true,
            message: "Todo updated by admin",
            data: todo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTodoAdmin = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        await todo.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Todo deleted by admin"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports= {
 createTodoAdmin,
 getAllTodosOfUsers,
 getAllTodosAdmin,
 updateTodoAdmin,
deleteTodoAdmin   
};