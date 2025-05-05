import { useState } from "react";
import { useParams, useLocation } from "react-router-dom"

function Login({token,setToken}){
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")
    const location = useLocation();

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
                const result = await response.json()
                console.log(result);
                if (result.token){
                    localStorage.setItem("token", result.token)
                    setToken(result.token)
                    alert("You are now logged in!");
                    window.location.href= "/";
                }else{
                    alert("Error. Please try again, or sign up first!")
                }
                
        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
            <label>
            Email:
                <input name="email" onChange={(event)=> setEmail(event.target.value)}
                value={email}
                />
            </label>
            <label>
            Password
            <input name="password" onChange={(event)=> setPassword(event.target.value)}
            value={password}
            />
            </label>
            <button>Login!</button>
            </form>
        </>
    );
  }
  
  export default Login;