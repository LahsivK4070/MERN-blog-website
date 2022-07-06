import React from 'react';
import "./header.css";
import headerImg from "./headerImg.jpg";

const Header = () => {
  return (
    <div className='header'>
        <img src={headerImg} alt='header-img' className='header-img' />
    </div>
  )
}

export default Header;
