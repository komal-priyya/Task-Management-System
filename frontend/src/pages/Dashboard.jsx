

import { useEffect, useState } from "react";
import API_URL from "../services/api";
import TodoForm from "../components/TodoForm";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Which todo are we currently editing?
  const [editingId, setEditingId] = useState(null);

  // Temporary data while editing
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  // GET ALL TODOS
  const loadTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      console.log("GET TODOS RESPONSE:", data);

      if (!response.ok) {
        console.log(data.message || "Failed to load todos");
        return;
      }

      setTodos(data.data);

    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  };


  // CLICK EDIT
  const handleEdit = (todo) => {
    // Store which todo is being edited
    setEditingId(todo._id);

    // Copy existing todo data into edit form
    setEditForm({
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
  };


  // HANDLE INPUT CHANGES WHILE EDITING
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };


  // UPDATE TODO
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${API_URL}/todos/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update todo");
        return;
      }

      console.log("Todo updated:", data);

      // Exit edit mode
      setEditingId(null);

      // Clear edit form
      setEditForm({
        title: "",
        description: "",
        status: "pending",
      });

      // Get fresh todos from backend
      loadTodos();

    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


  // CANCEL EDIT
  const handleCancel = () => {
    setEditingId(null);

    setEditForm({
      title: "",
      description: "",
      status: "pending",
    });
  };
// delete
const handleDelete = async (todoId) => {
  try {
    const response = await fetch(
      `${API_URL}/todos/${todoId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete todo");
      return;
    }

    console.log("Todo deleted:", data);

    // Reload todos from backend
    loadTodos();

  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};




const handleLogout = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Logout failed");
      return;
    }

    console.log("Logout successful:", data);

    // Redirect to login page
    navigate("/login");

  } catch (error) {
    console.error("Error logging out:", error);
  }
};


  // LOAD TODOS WHEN DASHBOARD OPENS
  useEffect(() => {
    loadTodos();
  }, []);


  if (loading) {
    return <h1>Loading...</h1>;
  }




    

return (
  <div className="min-h-screen bg-stone-50">

    {/* Navbar */}
    <nav className="bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* App name */}
          <h2 className="text-xl font-semibold text-stone-800">
            Task Manager
          </h2>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-2">

            <button
              onClick={() => navigate("/dashboard")}
              className="
                px-4 py-2
                rounded-lg
                text-sm font-medium
                bg-stone-800
                text-white
                hover:bg-stone-700
                transition
              "
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="
                px-4 py-2
                rounded-lg
                text-sm font-medium
                bg-stone-100
                text-stone-700
                border border-stone-200
                hover:bg-stone-200
                transition
              "
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="
                px-4 py-2
                rounded-lg
                text-sm font-medium
                text-red-600
                border border-red-200
                hover:bg-red-50
                transition
              "
            >
              Logout
            </button>

          </div>
        </div>

      </div>
    </nav>


    {/* Main content */}
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-stone-800">
          My Todos
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Keep track of the things you need to get done.
        </p>
      </div>


      {/* Create Todo */}
      <TodoForm onTodoCreated={loadTodos} />


      {/* Todo list */}
      <div className="mt-8 space-y-4">

        {todos.length === 0 ? (

          <div className="
            bg-white
            border border-stone-200
            rounded-xl
            p-8
            text-center
          ">
            <p className="text-stone-500">
              No todos found.
            </p>

            <p className="text-sm text-stone-400 mt-1">
              Add your first todo to get started.
            </p>
          </div>

        ) : (

          todos.map((todo) => (

            <div
              key={todo._id}
              className="
                bg-white
                border border-stone-200
                rounded-xl
                p-5
                sm:p-6
                shadow-sm
              "
            >

              {/* EDIT MODE */}
              {editingId === todo._id ? (

                <div className="space-y-4">

                  <h3 className="text-lg font-semibold text-stone-800">
                    Edit Todo
                  </h3>

                  {/* Title */}
                  <div>
                    <label className="
                      block
                      text-sm
                      font-medium
                      text-stone-700
                      mb-2
                    ">
                      Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="
                        w-full
                        px-4 py-3
                        bg-stone-50
                        border border-stone-300
                        rounded-lg
                        outline-none
                        text-stone-800
                        focus:bg-white
                        focus:border-stone-500
                        focus:ring-2
                        focus:ring-stone-200
                      "
                    />
                  </div>


                  {/* Description */}
                  <div>
                    <label className="
                      block
                      text-sm
                      font-medium
                      text-stone-700
                      mb-2
                    ">
                      Description
                    </label>

                    <input
                      type="text"
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="
                        w-full
                        px-4 py-3
                        bg-stone-50
                        border border-stone-300
                        rounded-lg
                        outline-none
                        text-stone-800
                        focus:bg-white
                        focus:border-stone-500
                        focus:ring-2
                        focus:ring-stone-200
                      "
                    />
                  </div>


                  {/* Status */}
                  <div>
                    <label className="
                      block
                      text-sm
                      font-medium
                      text-stone-700
                      mb-2
                    ">
                      Status
                    </label>

                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="
                        w-full
                        px-4 py-3
                        bg-stone-50
                        border border-stone-300
                        rounded-lg
                        outline-none
                        text-stone-800
                        focus:bg-white
                        focus:border-stone-500
                        focus:ring-2
                        focus:ring-stone-200
                      "
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="completed">
                        Completed
                      </option>
                    </select>
                  </div>


                  {/* Edit buttons */}
                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-2
                    pt-2
                  ">

                    <button
                      onClick={handleUpdate}
                      className="
                        w-full
                        sm:w-auto
                        px-5 py-2.5
                        rounded-lg
                        bg-stone-800
                        text-white
                        text-sm
                        font-medium
                        hover:bg-stone-700
                        transition
                      "
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={handleCancel}
                      className="
                        w-full
                        sm:w-auto
                        px-5 py-2.5
                        rounded-lg
                        bg-stone-100
                        text-stone-700
                        border border-stone-200
                        text-sm
                        font-medium
                        hover:bg-stone-200
                        transition
                      "
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                /* NORMAL TODO DISPLAY */

                <div>

                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    gap-4
                  ">

                    {/* Todo content */}
                    <div className="min-w-0">

                      <h3 className="
                        text-lg
                        font-semibold
                        text-stone-800
                        wrap-break-word
                      ">
                        {todo.title}
                      </h3>

                      <p className="
                        text-sm
                        text-stone-500
                        mt-2
                        wrap-break-word
                      ">
                        {todo.description || "No description"}
                      </p>

                    </div>


                    {/* Status */}
                    <span className={`
                      self-start
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${
                        todo.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    `}>
                      {todo.status}
                    </span>

                  </div>


                  {/* Todo buttons */}
                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-2
                    mt-5
                  ">

                    <button
                      onClick={() => handleEdit(todo)}
                      className="
                        w-full
                        sm:w-auto
                        px-5 py-2.5
                        rounded-lg
                        bg-stone-100
                        text-stone-700
                        border border-stone-200
                        text-sm
                        font-medium
                        hover:bg-stone-200
                        transition
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="
                        w-full
                        sm:w-auto
                        px-5 py-2.5
                        rounded-lg
                        bg-red-50
                        text-red-600
                        border border-red-200
                        text-sm
                        font-medium
                        hover:bg-red-100
                        transition
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )}

            </div>

          ))

        )}

      </div>

    </main>

  </div>
)
};

export default Dashboard;
