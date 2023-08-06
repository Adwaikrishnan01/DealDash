import React, { useState,useEffect } from 'react';
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector,useDispatch} from 'react-redux'
import { Link,useNavigate  } from 'react-router-dom';
import './Header.scss';
import { userLogout } from '../Redux/authSlice';


function Header() {
    const navigate = useNavigate();
    const user=useSelector((state)=>state.auth).user
    console.log("user in header",user)
  
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
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

   
    return (
      <header className="header">
        <div className="header__content">
          <Link to="/" className="header__content__logo">
            DealDash
          </Link>
          <nav
            className={`${"header__content__nav"} 
            ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
            }`}> 
            <ul>{user===null &&(<><li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/policy">Policy</Link>
          </li>
          <Link to="/login">
            <button className="btn btn__login">Login</button>
          </Link><li><Link to="/register">
            <button className="btn">Register</button>
          </Link></li></>)}
          
           {user?.role===1 &&(<li> 
           <Link to="/admindashboard">admindashboard</Link></li>)}
           {user?.role===0 &&(<><li><Link to="/">home</Link></li>
            <li><Link to="/orders">Orders</Link></li>
             <li><Link to="/Category">Category</Link></li></>)}
              {user &&<li> <Link to="/login">
                       <button className="btn btn__login" onClick={()=>dispatch(userLogout())}>Logout</button>
                      </Link></li>}
           
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
