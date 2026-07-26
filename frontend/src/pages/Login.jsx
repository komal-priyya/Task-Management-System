
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API_URL from "../services/api";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }

//       console.log("Login successful:", data);

//       // Login successful
//       navigate("/dashboard");

//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>

//       {error && <p>{error}</p>}

//       <form onSubmit={handleSubmit}>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">
//           Login
//         </button>

//       </form>

//       <p>
//         Don't have an account?{" "}
//         <Link to="/register">
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../services/api";

function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({

  email: localStorage.getItem("loginEmail") || "",
email: "",
password: "",
});

const [error, setError] = useState("");
const [password, setPassword] = useState("");

const handleChange = (e) => {
  const {name,value} = e.target;
setFormData({
...formData,
[name]:value,
});

// Save only email draft
if(name==="email"){
  localStorage.setItem("loginEmail",value);
}
};

const handleSubmit = async (e) => {
e.preventDefault();


setError("");

try {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.message || "Login failed");
    return;
  }

  console.log("Login successful:", data);
localStorage.removeItem("loginEmail");
  // Login successful
  navigate("/dashboard");

} catch (error) {
  console.error("Login error:", error);
  setError("Something went wrong. Please try again.");
}


};

return ( <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-8">


  <div className="w-full max-w-md">

    {/* App heading */}
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-800">
        Task Manager
      </h1>

      <p className="mt-2 text-sm sm:text-base text-stone-500">
        Welcome back. Let's get things done.
      </p>
    </div>

    {/* Login card */}
    <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">

      <h2 className="text-xl sm:text-2xl font-semibold text-stone-800 mb-6">
        Log in
      </h2>

      {/* Error message */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700 mb-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
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

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-stone-700 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
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

        {/* Login button */}
        <button
          type="submit"
          className="
            w-full
            py-3
            px-4
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
          Log in
        </button>

      </form>

      {/* Register */}
      <p className="text-center text-sm text-stone-500 mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-stone-800 hover:underline"
        >
          Create one
        </Link>
      </p>

    </div>

    {/* Small footer */}
    <p className="text-center text-xs text-stone-400 mt-6">
      Keep your tasks organized, one step at a time.
    </p>

  </div>

</div>


);
}

export default Login;
