 import { useState, useEffect } from "react";
 import { useParams, useNavigate } from "react-router-dom";

 function SingleBook({token, book, setBook}){

  const [reserved, setReserved] = useState([])

  const {id} = useParams()

        useEffect(()=>{
            const getBook = async () =>{
              const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
              const data = await res.json()       
              setBook(data)
            }
        
            getBook();
            console.log(book)
          },[])

    const handleReserve = async () => {
      if (!token){
        alert("You cannot reserve books unless you are a user!")
      }
      try{
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
            {
                method: "POST",
                headers:{
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                bookId:book.id,
              })
        });
            const result = await response.json()
            if(!response.ok) {
              alert("This book cannot be reserved currently. Check availability and try again later.");
           }else{
            alert("Book successfully reserved! Go to your account to see reserved books.")}
            setReserved(result);
    }catch(error){
        console.log(error);
    }}


          
    return(
        <>
        <h1>{book.title}</h1>
        <img src={book?.coverimage} style={{height:"200px"}}/>
        <p>Author: {book.author}</p>
        <p>Description: {book.description}</p>
        <p>Availability: {book.available ? "Available" : "Not Available"}</p>
        <div>
          {token &&
        <button onClick={handleReserve}>Reserve</button>
          }
        </div>
        </>
    )
 }

 export default SingleBook