import { useEffect, useState } from "react"

function Account({token}){
    const [auth, setAuth] = useState([])

    useEffect(()=> {
    async function getAuth(){
        try{
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
            {
                method: "GET",
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            console.log(result);
            setAuth(result)

        }catch(error){
            console.log(error)
        }
    }

    getAuth();
    },[])

    return(
        <>
        {token?
        <div>
            <h1>Hi {auth?.firstname}</h1>
            <h2>Your email is {auth?.email}</h2>
            <h2>Your reservations include: {auth?.reservations}</h2>
        </div>
        :
        <h2>You are not signed in! Please sign up!</h2>    
    }
        </>
    )
}

export default Account;