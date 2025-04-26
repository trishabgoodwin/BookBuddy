import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import BookList from './components/BookList'
import SingleBook from './components/SingleBook'
import Nav from './components/Nav'
import Register from './components/Register'

function App() {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({})
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  return (
    <>
    <div>
      <Nav />
    </div>

    <div>
    <Routes>
      <Route path="/" element={<BookList books={books} setBooks={setBooks} />} />
      <Route path="/SingleBook/:id" element={<SingleBook  book={book} setBook={setBook} books={books} setBooks={setBooks}/> } />
      <Route path="/Register" element={<Register token={token} setToken={setToken} />}/>
    </Routes>
    </div>
    </>

  )
}

export default App
