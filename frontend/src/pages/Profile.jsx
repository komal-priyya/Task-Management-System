
import { useEffect, useState } from "react";
import API_URL from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {
const getProfile = async () => {
try {
const response = await fetch(`${API_URL}/auth/profile`, {
method: "GET",
credentials: "include",
});


    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to fetch profile");
      return;
    }

    setUser(data.data);

  } catch (error) {
    console.error("Error fetching profile:", error);
  } finally {
    setLoading(false);
  }
};

getProfile();


}, []);

// Loading state
if (loading) {
return ( <div className="
     min-h-screen
     bg-stone-50
     flex
     items-center
     justify-center
     px-4
   "> <p className="text-stone-500">
Loading profile... </p> </div>
);
}

// Failed to load profile
if (!user) {
return ( <div className="
     min-h-screen
     bg-stone-50
     flex
     items-center
     justify-center
     px-4
   "> <div className="
       w-full
       max-w-md
       bg-white
       border border-stone-200
       rounded-2xl
       p-6
       sm:p-8
       text-center
       shadow-sm
     ">


      <h2 className="text-xl font-semibold text-stone-800">
        Unable to load profile
      </h2>

      <p className="text-sm text-stone-500 mt-2">
        Something went wrong while fetching your profile.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="
          mt-6
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
  </div>
);


}

return ( <div className="min-h-screen bg-stone-50">


  {/* Navbar */}
  <nav className="bg-white border-b border-stone-200">

    <div className="
      max-w-6xl
      mx-auto
      px-4 sm:px-6
      py-4
    ">

      <div className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        {/* App name */}
        <h2 className="
          text-xl
          font-semibold
          text-stone-800
        ">
          Task Manager
        </h2>


        {/* Navigation */}
        <div className="
          flex
          flex-wrap
          items-center
          gap-2
        ">

          <button
            onClick={() => navigate("/dashboard")}
            className="
              px-4 py-2
              rounded-lg
              text-sm
              font-medium
              bg-stone-800
              text-white
              hover:bg-stone-700
              transition
            "
          >
            Dashboard
          </button>

        </div>

      </div>

    </div>

  </nav>


  {/* Main content */}
  <main className="
    max-w-2xl
    mx-auto
    px-4 sm:px-6
    py-8 sm:py-12
  ">

    {/* Page heading */}
    <div className="mb-8">

      <h1 className="
        text-2xl
        sm:text-3xl
        font-semibold
        text-stone-800
      ">
        My Profile
      </h1>

      <p className="
        mt-2
        text-sm
        text-stone-500
      ">
        View your account information.
      </p>

    </div>


    {/* Profile card */}
    <div className="
      bg-white
      border border-stone-200
      rounded-2xl
      shadow-sm
      overflow-hidden
    ">

      {/* Profile header */}
      <div className="
        px-5 sm:px-8
        py-6
        border-b border-stone-200
        bg-stone-50
      ">

        <div className="
          flex
          items-center
          gap-4
        ">

          {/* Avatar */}
          <div className="
            w-14 h-14
            sm:w-16 sm:h-16
            rounded-full
            bg-stone-800
            text-white
            flex
            items-center
            justify-center
            text-xl
            font-semibold
            uppercase
          ">
            {user.name?.charAt(0)}
          </div>


          {/* Name */}
          <div>

            <h2 className="
              text-lg
              sm:text-xl
              font-semibold
              text-stone-800
            ">
              {user.name}
            </h2>

            <p className="
              text-sm
              text-stone-500
              mt-1
            ">
              {user.email}
            </p>

          </div>

        </div>

      </div>


      {/* User information */}
      <div className="
        divide-y
        divide-stone-200
      ">

        {/* Name */}
        <div className="
          px-5 sm:px-8
          py-5
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
        ">

          <span className="
            text-sm
            font-medium
            text-stone-500
          ">
            Name
          </span>

          <span className="
            text-sm
            sm:text-base
            text-stone-800
            font-medium
            wrap-break-word
          ">
            {user.name}
          </span>

        </div>


        {/* Email */}
        <div className="
          px-5 sm:px-8
          py-5
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
        ">

          <span className="
            text-sm
            font-medium
            text-stone-500
          ">
            Email
          </span>

          <span className="
            text-sm
            sm:text-base
            text-stone-800
            font-medium
            break-all
            sm:break-normal
          ">
            {user.email}
          </span>

        </div>


        {/* Role */}
        <div className="
          px-5 sm:px-8
          py-5
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
        ">

          <span className="
            text-sm
            font-medium
            text-stone-500
          ">
            Role
          </span>

          <span className="
            self-start
            sm:self-auto
            px-3 py-1
            rounded-full
            bg-stone-100
            text-stone-700
            text-xs
            font-medium
            capitalize
          ">
            {user.role}
          </span>

        </div>

      </div>


      {/* Back button */}
      <div className="
        px-5 sm:px-8
        py-5
        border-t border-stone-200
      ">

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

    </div>

  </main>

</div>


);
}

export default Profile;
