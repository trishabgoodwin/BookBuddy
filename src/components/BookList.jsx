import { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";


function BookList({books, setBooks}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [fullBookList, setFullBookList] = useState([]);
    const location = useLocation();

    
    useEffect(()=>{
        const getBooks = async () =>{
          const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
          const data = await res.json()
    
          setBooks(data);
          setFullBookList(data);

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
          
            const results = fullBookList.filter(book =>
              book.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setBooks(results);
          };

      const handleClear = () => {
            setSearchTerm('');
            setBooks(fullBookList);
          };    
         
      useEffect(() => {
            if (location.pathname === '/') {
              setBooks(fullBookList); 
              setSearchTerm('');
            }
          }, [location]);


return(
    <>
      <div className="greeting">
        <div>
          <h1>Book Buddy</h1>
        </div>
        <div>
          <p>Browse the books in our catalogue. Click "Details" to learn more.<br/>
            Sign up or login to reserve books and to see your reservations.</p>
        </div>
        <div>
          <p>You can search for a book title here:</p>
        </div>
        <div>  
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
      </div>
    <div className="allbooks">
      {
            books.map((book)=>
                <div key={book.id} className="book">
                    <h3>{book.title}</h3>
                    <img src={book?.coverimage} style={{height:"200px"}}/>
                    <div>
                        <button onClick={()=> handleClick(book)}>Details</button>
                    </div>
                </div>
            )
       }
    </div>
  </>
    )

}

export default BookList