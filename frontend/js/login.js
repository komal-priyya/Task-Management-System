
const registerForm= document.querySelector("#registerForm")



registerForm.addEventListener("submit",async (e)=>{

    e.preventDefault();
const email= document.querySelector("#email").value;
const password= document.querySelector("#password").value;


try{
const response= await fetch("http://127.0.0.1:3000/api/auth/login",{
method: "POST",
headers:{
    "Content-Type":"application/json"
},
credentials:"include",
body:JSON.stringify({
    email,
    password
})

})
const data = await response.json();
console.log(data);
if(data.success){
    alert(data.message);
                window.location.href = "dashboard.html";

    
}else{
   alert(data.message);   
}


}catch(error){
    console.log(error)
    alert("something went wrong")
}


});