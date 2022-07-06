import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import { useContext } from 'react';
import { Context } from "../../context/Context";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);

  const PF = "images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <div className='navbar'>
        <div className="left">
              <h1 className='title'>Blog You</h1>
              <ul className='navItems'>
          <li className='nav-item' onClick={() => { window.scrollTo(0, 0) }}><Link to="/" className='link'>Home</Link></li>
          <li className='nav-item' onClick={() => { window.location.replace("/#about") }}>About</li>
                  <li className='nav-item' onClick={() => { window.location.replace("/#follow") }}>Contact</li>
                  {user && <li className='nav-item'><Link to="/write" className='link'>Write</Link></li>}
              </ul>
      </div>
      {
        user ? (
          <div className="right">
            <Link to="/settings">
              <img src={PF + user.profilePic} alt='profile' className='nav-img' />
              </Link>
              <p onClick={handleLogout}>Logout</p>
          </div>
        ) : (
          <div className="right">
              <ul className='navItems'>
                  <li className='nav-item'><Link to="/login" className='link'>Login</Link></li>
                  <li className='nav-item'><Link to="/register" className='link'>Register</Link></li>
                  
              </ul>
          </div>
        )
      }
  
    </div>
  )
}

export default Navbar;
