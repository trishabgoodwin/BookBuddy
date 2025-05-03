import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Account({token, auth, setAuth}){

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

            setAuth(result);

        }catch(error){
            console.log(error)
        }
    }

    getAuth();
    },[])

    const {id} = useParams()

    const handleReturn = async () => {
        if (!token){
          alert("You cannot reserve books unless you are a user!")
        }
        try{
          const response = await fetch((`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`),
              {
                  method: "DELETE",
                  headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  id : auth.reservations?.id,
                })
          });
              const result = await response.json()
              alert("Book successfully removed! Go to your account to see reserved books.")
      }catch(error){
          console.log(error);
      }}

    return(
        <>
        {token ?
        <div>
            <div>
            <h1>Hi {auth.firstname}!</h1>
            <h2>Your email is: {auth.email}</h2>
            </div>
            <div>
                <p>Reserved Books:</p>
                <div>
                    <ul>
                    {auth.reservations?.map((book) => (
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => handleReturn(auth.reservations?.id)}>Delete</button>
                    </li>          
                     ))}
                    </ul>
                </div>
            </div>
        </div>
        
        :
        <h2>You are not signed in! Please sign up!</h2>    
    }
        </>
    )
}

export default Account;