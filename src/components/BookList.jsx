import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


function BookList({books, setBooks}) {

    useEffect(()=>{
        const getBooks = async () =>{
          const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
          const data = await res.json()
    
          setBooks(data)
    
        }
    
        getBooks();
        console.log(books)
    
      },[])

      const navigate = useNavigate();

      const handleClick = (book) => {
          navigate(`/SingleBook/${book.id}`);
        };

return(
    <>
    <div>
        <h1>Book Buddy</h1>
        <p>Here are the books in our catalogue:</p>
    </div>
   {
            books.map((book)=>
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <img src={book?.coverimage} style={{height:"200px"}}/>
                    <div>
                        <button onClick={()=> handleClick(book)}>Details</button>
                    </div>
                </div>
            )
        }
    </>
    )

}

export default BookList