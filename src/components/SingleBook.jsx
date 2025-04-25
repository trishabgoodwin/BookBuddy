 import { useState, useEffect } from "react";
 import { useParams } from "react-router-dom";

 function SingleBook({book, setBook}){

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

    return(
        <>
        <h1>{book.title}</h1>
        <img src={book?.coverimage} style={{height:"200px"}}/>
        <p>Author: {book.author}</p>
        <p>{book.description}</p>
        <p>{book.availability}</p>
        </>
    )
 }

 export default SingleBook