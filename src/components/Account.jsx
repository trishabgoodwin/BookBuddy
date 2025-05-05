import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"

function Account({token, auth, setAuth}){

    const [returned, setReturned] = useState([])
    const [reservations, setReservations] = useState([])

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


    useEffect(()=> {
        async function listReservations(){
            try{
                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
                {
                    method: "GET",
                    headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                const result = await response.json()
                console.log(result);
    
                setReservations(result);
    
            }catch(error){
                console.log(error)
            }
        }
    
        listReservations();
        },[])

    const handleReturn = async (reservationId) => {
        try{
          const response = await fetch(
                `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
              {
                  method: "DELETE",
                  headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(!response.ok) {
            throw new Error("Failed to delete reservation.");
        }
        alert("Book successfully returned!");
        setReservations(current=>
            current.filter(res => res.id !== reservationId)
        );
      }catch(error){
          console.log(error);
      }}

      const handleLogout = () => {
        setAuth(null);
        localStorage.removeItem("token");
        window.location.href= "/";
      }

    return(
        <>
        {token ?
        <div>
            <div className="accountgreet">
                <h1>Hi {auth.firstname}!</h1>
                 <h2>Your email is: {auth.email}</h2>
                 <h3>Reserved Books:</h3>
            </div>
            <div>
            <ul>
                    {reservations?.map((reservation) => (
                    <li className="resbook" key={reservation.id}>
                        {reservation.title} <br/>
                        <button onClick={() => handleReturn(reservation.id)}>Delete</button>
                    </li>          
                     ))}
                </ul>
            </div>
            <div>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
        
        :
        <h2>You are not signed in! Please sign up!</h2>    
    }
        </>
    )
}

export default Account;