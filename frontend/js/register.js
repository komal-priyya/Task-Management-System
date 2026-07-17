console.log("register.js loaded");
const registerForm = document.querySelector("#registerForm");




// Listen for form submission
registerForm.addEventListener("submit", async (e) => {

    // Stop the page from refreshing
    e.preventDefault();

    // Get values from the input fields
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {

        // Send data to backend
        const response = await fetch("http://127.0.0.1:3000/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
credentials:"include",
            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        // Convert response to JavaScript object
        const data = await response.json();

        console.log(data);

        
        if (data.success) {

            alert(data.message);

            // Go to login page
            // window.location.href = "login.html"

        } else {

            alert(data.message);

        }



    } catch (error) {

        console.log(error);

        alert("Something went wrong");

    }

});









