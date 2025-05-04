import { Routes, Route, Link } from "react-router-dom";

function Nav() {
    return (
      <div className="navbar">
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/Register" className="nav-link">Register</Link></li>
          <li><Link to="/Login" className="nav-link">Login</Link></li>
          <li><Link to="/Account" className="nav-link">Account</Link></li>
        </ul>
      </div>
    );
  }
  
  export default Nav;