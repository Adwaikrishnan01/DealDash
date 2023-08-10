import React from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";

const navbar=()=> {
   const seri=useCategory()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Your Logo
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {seri.map((item)=>(
                <Link className="dropdown-item" to="/category1">{item.name}</Link>
                  
              ))}
                
               
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/all-categories">
                  All Categories
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {/* Add more menu items */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default navbar