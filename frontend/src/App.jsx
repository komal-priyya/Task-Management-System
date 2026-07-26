// import {BrowserRouter,Routes,Route} from "react-router-dom"

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import GuestRoute from "./components/GuestRoute";

// function App (){

//   return(
//  <BrowserRouter> 
//     <Routes>
// <Route path='/' element={
 
//       <Login />
     

//   }/>
//   <Route path="/login" element={
    
//     <GuestRoute>
//       <Login />
//     </GuestRoute>
    
//     } />
//         <Route path="/register" element={

//            <GuestRoute>
//       <Register />
//     </GuestRoute>
          
//           } />

//          <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//     </Routes>
//      </BrowserRouter> 
//   )
// }
// export default App;

import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Route protection
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Only logged-out users can access */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Only logged-in users can access */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;