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
          
            const filteredResults = books.filter(item =>
              Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
              )
            );
            setSearchResults(filteredResults);
          };

          const handleClear = () => {
            setSearchTerm('');
            setSearchResults([]);
          };

return(
    <>
    <div>
        <h1>Book Buddy</h1>
        <p>Here are the books in our catalogue:</p>
        <div>
        <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
         />
        <div>
        <button onClick={handleClear}>Clear</button>
        </div>
        <div>
        <ul>
        {searchResults.map(item => (
          <li key={item.id}>{}
          {Object.entries(item).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
          </li>
         ))}
        </ul>
        </div>
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