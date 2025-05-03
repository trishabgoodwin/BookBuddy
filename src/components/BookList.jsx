import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


function BookList({books, setBooks}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        const getBooks = async () =>{
          const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
          const data = await res.json()
    
          setBooks(data)
        }
    
        getBooks();
    
      },[])

      const navigate = useNavigate();

      const handleClick = (book) => {
          navigate(`/SingleBook/${book.id}`);
        };

      const handleSearch = (event) => {
            const searchTerm = event.target.value;
            setSearchTerm(searchTerm);
          
            const results = books.filter(book =>
              book.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setBooks(results);
          };

      const handleClear = () => {
            setSearchTerm('');
            setBooks(books);
          };

          

return(
    <>
    <div>
        <h1>Book Buddy</h1>
        <p>Browse the books in our catalogue. Click "Details" to learn more.<br/>
            Sign up or login to reserve books and to see your reservations.</p>
        <div>
        <p>You can search for a book title here:</p>
        <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
         />
        </div>
        <div>
        <button onClick={handleClear}>Reset</button>
        </div>
        <div>
        <ul>
        {searchResults.map((book) => (
              <li key={book.id}>{book.title}</li>          
            ))}
        </ul>
        </div>
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