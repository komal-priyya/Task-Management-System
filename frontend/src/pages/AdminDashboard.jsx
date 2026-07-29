


import { useEffect, useState } from "react";
import API_URL from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [todosLoading, setTodosLoading] = useState(false);
const navigate =useNavigate()

 const [todoForm, setTodoForm] = useState({
  title: "",
  description: "",
  status: "pending",
  userId: "",
});

const [creatingTodo, setCreatingTodo] = useState(false); 

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/users`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        console.log("ALL USERS RESPONSE:", data);

        if (response.ok) {
          setUsers(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);





  const handleCreateTodo = async (e) => {
  e.preventDefault();

  if (!todoForm.userId) {
    alert("Please select a user");
    return;
  }

  if (!todoForm.title.trim()) {
    alert("Please enter a title");
    return;
  }

  setCreatingTodo(true);

  try {
    const response = await fetch(`${API_URL}/admin/todos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todoForm),
    });

    const data = await response.json();

    console.log("CREATE TODO RESPONSE:", data);

    if (response.ok) {
      alert("Todo created successfully!");

      // If the selected user is the user we created the todo for,
      // add the new todo immediately to the displayed list
      if (selectedUser?._id === todoForm.userId) {
        setTodos((prevTodos) => [...prevTodos, data.data]);
      }

      // Clear form
      setTodoForm({
        title: "",
        description: "",
        status: "pending",
        userId: "",
      });
    } else {
      alert(data.message || "Failed to create todo");
    }
  } catch (error) {
    console.error("Error creating todo:", error);
    alert("Something went wrong while creating the todo");
  } finally {
    setCreatingTodo(false);
  }
};
  // Fetch selected user's todos
 const handleViewTodos = async (user) => {
  setTodosLoading(true);

  try {
    // Save selected user ID
    localStorage.setItem("adminSelectedUserId", user._id);

    const response = await fetch(`${API_URL}/admin/todos/all`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      const userTodos = data.data.filter(
        (todo) => String(todo.user?._id) === String(user._id)
      );

      setTodos(userTodos);
      setSelectedUser(user);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
  } finally {
    setTodosLoading(false);
  }
};
useEffect(() => {
  if (users.length === 0) return;

  const savedUserId = localStorage.getItem("adminSelectedUserId");

  if (!savedUserId) return;

  const savedUser = users.find(
    (user) => String(user._id) === String(savedUserId)
  );

  if (savedUser) {
    handleViewTodos(savedUser);
  }
}, [users]);

  const handleDeleteTodo = async (todoId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this todo?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/admin/todos/${todoId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      // Remove deleted todo from current list
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== todoId)
      );

      console.log("Todo deleted successfully");
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
  // Loading users
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage users and view their todos
          </p>
          <button
          onClick={() => navigate("/dashboard")}
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
          Back to Dashboard
        </button>
        </div>


<div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-5">
    Create Todo for User
  </h2>

  <form onSubmit={handleCreateTodo} className="space-y-4">

    {/* Select User */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select User
      </label>

      <select
        value={todoForm.userId}
        onChange={(e) =>
          setTodoForm({
            ...todoForm,
            userId: e.target.value,
          })
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        required
      >
        <option value="">Choose a user</option>

        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} - {user.email}
          </option>
        ))}
      </select>
    </div>

    {/* Title */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Todo Title
      </label>

      <input
        type="text"
        value={todoForm.title}
        onChange={(e) =>
          setTodoForm({
            ...todoForm,
            title: e.target.value,
          })
        }
        placeholder="Enter todo title"
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        required
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>

      <textarea
        value={todoForm.description}
        onChange={(e) =>
          setTodoForm({
            ...todoForm,
            description: e.target.value,
          })
        }
        placeholder="Enter todo description"
        rows="3"
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
      />
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Status
      </label>

      <select
        value={todoForm.status}
        onChange={(e) =>
          setTodoForm({
            ...todoForm,
            status: e.target.value,
          })
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <button
      type="submit"
      disabled={creatingTodo}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2.5 rounded-lg"
    >
      {creatingTodo ? "Creating..." : "Create Todo"}
    </button>

  </form>
</div>


{/* Users + Todos Grid */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6"></div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Users Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

              {/* Users Header */}
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    All Users
                  </h2>

                  <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {users.length}
                  </span>
                </div>
              </div>

              {/* Users List */}
              <div className="p-4">
                {users.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      No users found.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user._id}
                        className={`p-4 rounded-xl border transition ${
                          selectedUser?._id === user._id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">

                          {/* User Information */}
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate">
                              {user.name}
                            </h3>

                            <p className="text-sm text-gray-500 truncate mt-1">
                              {user.email}
                            </p>

                            <span
                              className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {user.role}
                            </span>
                          </div>

                          {/* View Todos Button */}
                          <button
                            onClick={() => handleViewTodos(user)}
                            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition"
                          >
                            View Todos
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Todos Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

              {/* Todos Header */}
              <div className="px-6 py-5 border-b border-gray-200">
                {selectedUser ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {selectedUser.name}'s Todos
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {selectedUser.email}
                      </p>
                    </div>

                    <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                      {todos.length}{" "}
                      {todos.length === 1 ? "Todo" : "Todos"}
                    </span>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      User Todos
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      Select a user to view their todos
                    </p>
                  </div>
                )}
              </div>

              {/* Todos Content */}
              <div className="p-6">
                {!selectedUser ? (
                  <div className="min-h-[300px] flex items-center justify-center text-center">
                    <div>
                      <div className="text-5xl mb-4">
                        📋
                      </div>

                      <h3 className="text-lg font-semibold text-gray-700">
                        No User Selected
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Click "View Todos" beside a user to see their tasks.
                      </p>
                    </div>
                  </div>
                ) : todosLoading ? (
                  <div className="min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                      <p className="mt-4 text-gray-600">
                        Loading todos...
                      </p>
                    </div>
                  </div>
                ) : todos.length === 0 ? (
                  <div className="min-h-[300px] flex items-center justify-center text-center">
                    <div>
                      <div className="text-5xl mb-4">
                        📝
                      </div>

                      <h3 className="text-lg font-semibold text-gray-700">
                        No Todos Found
                      </h3>

                      <p className="text-gray-500 mt-2">
                        {selectedUser.name} hasn't created any todos yet.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {todos.map((todo) => (
                      <div
                        key={todo._id}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {todo.title}
                          </h3>

                          <span
                            className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                              todo.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {todo.status}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mt-3">
                          {todo.description || "No description provided."}
                        </p>

<button
    onClick={() => handleDeleteTodo(todo._id)}
    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>


                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard