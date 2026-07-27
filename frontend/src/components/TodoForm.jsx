

import { useState } from "react";
import API_URL from "../services/api";

function TodoForm({ onTodoCreated }) {
const [formData, setFormData] = useState({
title: "",
description: "",
status: "pending",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Failed to create todo");
    return;
  }

  console.log("Todo created:", data);

  // Tell Dashboard that a new todo was created
  onTodoCreated();

  // Clear form
  setFormData({
    title: "",
    description: "",
    status: "pending",
  });

} catch (error) {
  console.error("Error creating todo:", error);
}


};

return ( <form
   onSubmit={handleSubmit}
   className="
     bg-white
     border border-stone-200
     rounded-xl
     p-5 sm:p-6
     shadow-sm
   "
 >

  {/* Form heading */}
  <div className="mb-5">
    <h2 className="text-lg sm:text-xl font-semibold text-stone-800">
      Add a new todo
    </h2>

    <p className="text-sm text-stone-500 mt-1">
      Add something you want to get done.
    </p>
  </div>


  {/* Form fields */}
  <div className="space-y-4">

    {/* Title */}
    <div>
      <label
        htmlFor="todo-title"
        className="
          block
          text-sm
          font-medium
          text-stone-700
          mb-2
        "
      >
        Title
      </label>

      <input
        id="todo-title"
        type="text"
        name="title"
        placeholder="What do you need to do?"
        value={formData.title}
        onChange={handleChange}
        required
        className="
          w-full
          px-4 py-3
          bg-stone-50
          border border-stone-300
          rounded-lg
          text-stone-800
          placeholder:text-stone-400
          outline-none
          transition
          focus:bg-white
          focus:border-stone-500
          focus:ring-2
          focus:ring-stone-200
        "
      />
    </div>


    {/* Description */}
    <div>
      <label
        htmlFor="todo-description"
        className="
          block
          text-sm
          font-medium
          text-stone-700
          mb-2
        "
      >
        Description
      </label>

      <textarea
        id="todo-description"
        name="description"
        placeholder="Add a little more detail (optional)"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="
          w-full
          px-4 py-3
          bg-stone-50
          border border-stone-300
          rounded-lg
          text-stone-800
          placeholder:text-stone-400
          outline-none
          resize-none
          transition
          focus:bg-white
          focus:border-stone-500
          focus:ring-2
          focus:ring-stone-200
        "
      />
    </div>


    {/* Status */}
    <div>
      <label
        htmlFor="todo-status"
        className="
          block
          text-sm
          font-medium
          text-stone-700
          mb-2
        "
      >
        Status
      </label>

      <select
        id="todo-status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="
          w-full
          px-4 py-3
          bg-stone-50
          border border-stone-300
          rounded-lg
          text-stone-800
          outline-none
          transition
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


    {/* Submit button */}
    <div className="pt-2">

      <button
        type="submit"
        className="
          w-full
          sm:w-auto
          px-6 py-3
          bg-stone-800
          text-white
          rounded-lg
          font-medium
          transition
          hover:bg-stone-700
          active:scale-[0.99]
          focus:outline-none
          focus:ring-2
          focus:ring-stone-300
          focus:ring-offset-2
        "
      >
        Add Todo
      </button>

    </div>

  </div>

</form>


);
}

export default TodoForm;
