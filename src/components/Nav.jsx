import { Routes, Route, Link } from "react-router-dom";

function Nav() {
    return (
      <div id="navbar">
          <Link to="/">Home</Link>
          <Link to="/Register">Register</Link>
          <Link to="/Login">Login</Link>
          <Link to="/Account">Account</Link>
      </div>
    );
  }
  
  export default Nav;