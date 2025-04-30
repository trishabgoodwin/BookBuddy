import { useState } from "react";

function Login({token,setToken}){
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")

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