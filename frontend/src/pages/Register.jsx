// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import API_URL from '../services/api';

// const Register = () => {
// const navigate = useNavigate();

// const [formData, setFormData]= useState({
//     name:"",
//     email:"",
//     password:""
// });
// const handleChange = (e) =>{
// setFormData({
//     ...formData,
//     [e.target.name]:e.target.value,
// });
// };

// const handleSubmit = async (e)=>{
//     e.preventDefault();

//     try{
//         const response = await fetch(`${API_URL}/auth/register`,{
//             method: "POST",
//             headers:{
//                "Content-Type": "application/json",  
//             },
//              credentials: "include",
//              body: JSON.stringify(formData),
//         });
//         const data = await response.json();
//         if(!response.ok){
//             alert(data.message || "Registration");
//             return;
//         }
//         alert("Registration Succesful");
//         navigate("/dashboard")
//     }catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }



// };


//   return (
//     <div>
        
//         <h1>Register</h1>

//         <form onSubmit= {handleSubmit}>
//             <label htmlFor="">Name</label>
//             <input type="text"
//             name='name' 
//             placeholder=' Enter your name'
//             value={formData.name}
//             onChange={handleChange}
//             />

// <label htmlFor="">Email</label>
//             <input type="email"
//             name='email'
//             placeholder='Enter your email'
//             value={formData.email}
//             onChange={handleChange} />

// <label htmlFor="">password</label>
//             <input type="password"
//             name='password'
//             placeholder='Enter your password'
//             value={formData.password}
//             onChange={handleChange} />

//             <button type="submit">
//                 Register
//             </button>
//         </form>
//     </div>
//   )
// }

// export default Register; 

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../services/api";

const Register = () => {
const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
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
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Registration failed");
    return;
  }

  alert("Registration successful");
  navigate("/dashboard");

} catch (error) {
  console.error(error);
  alert("Something went wrong");
}


};

return ( <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-8">

```
  <div className="w-full max-w-md">

    {/* App heading */}
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-800">
        Task Manager
      </h1>

      <p className="mt-2 text-sm sm:text-base text-stone-500">
        Create an account and start organizing your tasks.
      </p>
    </div>

    {/* Register card */}
    <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">

      <h2 className="text-xl sm:text-2xl font-semibold text-stone-800 mb-6">
        Create your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-stone-700 mb-2"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
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
            placeholder="Create a password"
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

        {/* Register button */}
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
          Create account
        </button>

      </form>

      {/* Login link */}
      <p className="text-center text-sm text-stone-500 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-stone-800 hover:underline"
        >
          Log in
        </Link>
      </p>

    </div>

    {/* Small footer */}
    <p className="text-center text-xs text-stone-400 mt-6">
      Start small. Stay organized. Get things done.
    </p>

  </div>

</div>


);
};

export default Register;
