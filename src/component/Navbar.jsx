import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold"><h3 className='text-primary'>Exercise Tracker</h3></Link>
        <form className="d-flex" role="search">
            <Link to="/create" className="btn btn-outline-primary"> Add +</Link>
            <Link to="/createuser" className="btn btn-outline-primary ms-2">User +</Link>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
