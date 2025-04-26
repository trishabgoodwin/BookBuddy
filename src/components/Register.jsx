import { useState,useEffect } from "react";
import {Route, Routes} from 'react-router-dom'

function Register({token, setToken}){
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const [firstname , setFirstname] = useState ('')
    const [lastname , setLastname] = useState ('')
    const [error, setError] =useState ("")

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname
                })
            });
                const result = await response.json()
                console.log(result);
                setToken(result.token)
                console.log(token);

        }catch(error){
            console.log(error)
            setError(error.response?.data?.message || 'Network error. Please try again.');
        }
    }

    return(
        <>
        <div className="error">
            {error && <p>${error}</p>}
        </div>
        <div>
            <form id="form" onSubmit={handleSubmit}>
            <label>
            Email
                <input type="email" name="email" onChange={(event)=> setEmail(event.target.value)}
                value={email}
                />
            </label>
            <label>
            Password
            <input name="password" onChange={(event)=> setPassword(event.target.value)}
            value={password}
            />
            </label><label>
            First Name
                <input name="firstname" onChange={(event)=> setFirstname(event.target.value)}
                value={firstname}
                />
            </label>
            <label>
            Last Name
                <input name="lastname" onChange={(event)=> setLastname(event.target.value)}
                value={lastname}
                />
            </label>
            <button>Sign Up!</button>
            </form>
        </div>  
        </>
    )
}

export default Register;