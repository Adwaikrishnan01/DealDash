import React, { useState, useEffect } from 'react';
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate,NavLink } from 'react-router-dom';
import './Header.scss';
import { userLogout } from '../Redux/authSlice';
import Searchinput from '../Searchinput';
import {useCategory} from '../../hooks/useCategory';
import UserProfile from '../../pages/user/Profile';


function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth).user
  const categories = useCategory()
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cart=useSelector(state=>state.cart)
  const [cartLength,setLength]=useState('')

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);


  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  useEffect(() => {
    setLength(cart.cartlist.length);
  }, [cart]);



  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo" style={{marginRight:"8px"}}>
          DealDash
        </Link>
        <nav
          className={`${"header__content__nav"} 
            ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
            }`}> <Searchinput />
          <ul> <li className="nav-item dropdown">
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
              <Link className="dropdown-item" to="/all-categories">
                  All Categories
                </Link>
                {categories.map((item)=>(
                <Link className="dropdown-item" key={item.name} to={`/category-products/${item.slug}`}>{item.name}</Link>
                  
              ))}
              </div>
            </li>{user===null && (<>
  
             <li>
                  <Link to="/about">About</Link>
                </li>
                {/*<li>
                  <Link to="/policy">Policy</Link>
                </li> */}

            <Link to="/login">
              <button className="btn btn__login">Login</button>
            </Link><li><Link to="/register">
              <button className="btn ">Register</button>
            </Link></li> <li><Link to="/cartlist">Cart<span 
              className="position-absolute top-0 right-0 badge p-1 bg-danger rounded-circle">{cartLength>0?cartLength:""}</span></Link></li></>)}

            {user?.role === 1 && (<><li>
              <Link to="/admindashboard">admindashboard</Link></li>
                <li> <button className="btn"  onClick={() => dispatch(userLogout())}>
       Logout
      </button></li></>)}
            {user?.role === 0 && (<>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/cartlist">Cart<span 
              className="position-absolute top-1 translate-middle badge p-1 bg-danger rounded-circle">{cartLength>0?cartLength:""}</span></Link> </li>
              <UserProfile/>
              </>)}
         
          </ul>

        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}


export default Header;
