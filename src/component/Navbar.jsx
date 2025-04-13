import React ,{useState,useEffect}from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate ,useLocation} from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated ,SetIsAuthenticated]=useState(false);

  useEffect(()=>{
    axios.get('http://localhost:5000/client/verify',{withCredentials: true})
    .then((res)=>{
      SetIsAuthenticated(true)
    })
    .catch((err)=>{
      SetIsAuthenticated(false)
    })
  })


  const handlelogout = () => {
    axios.post('http://localhost:5000/client/logout', {}, { withCredentials: true })
      .then(response => {
        alert("logout successfully");
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
  }

 const atlogin = location.pathname === "/login";
 const atregister = location.pathname === "/";
  return (
    <nav className="navbar bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold"><h3 className='text-primary'>Exercise Tracker</h3></Link>
        <form className="d-flex" role="search">
          <Link to="/create" className="btn btn-outline-primary"> Add +</Link>
          <Link to="/createuser" className="btn btn-outline-primary ms-2">User +</Link>
          {isAuthenticated && (
          <button className="btn btn-outline-danger ms-2" onClick={handlelogout}>logout</button>)
          }
          {!isAuthenticated && atregister &&(
            <Link to="/login" className="btn btn-outline-success ms-2" >Login</Link>
          )}
          {!isAuthenticated && atlogin && (
            <Link to="/" className="btn btn-outline-success ms-2" >Register</Link>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
