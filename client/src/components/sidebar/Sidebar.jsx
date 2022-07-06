import React from 'react';
import "./sidebar.css";
import aboutImg from "./aboutImg.jpg";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("api/categories/");
      setCat(res.data);
    }
    getCat();
  }, []);

  return (
    <div className='sidebar'>
      
      {/* about section */}

      <div className='about-section' id='about'>
        <p className='about-heading'>ABOUT ME</p>
        <img src={aboutImg} alt='about-img' className='about-img'/>
        <p className='about-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorum, optio aliquam ex dolorem inventore similique culpa.</p>
      </div>

      {/* category section */}

      <div className='category-section'>
        <p className='category-heading'>CATEGORIES</p>
        <ul className='category-list'>
          
          {cat.map((c)=>{
            return <Link to={`/?cat=${(c)}`} className="link"><li className='category-list-item'>{c}</li></Link>;
          })}
        </ul>
      </div>

      {/* Follow section */}

      <div className='follow-section' id="follow">
        <div className="follow-heading">FOLLOW US</div>
        <div className="follow-icons">
        <a href="https://www.facebook.com" target="_blank" rel='noreferrer'><i className="follow-icon fa-brands fa-facebook-square" style={{cursor: "pointer"}}></i></a>
          <a href='https://www.instagram.com' target="_blank" rel='noreferrer'><i className="follow-icon fa-brands fa-instagram-square" style={{cursor: "pointer"}}></i></a>
          <a href='https://www.twitter.com' target="_blank" rel='noreferrer'><i className="follow-icon fa-brands fa-twitter-square" style={{cursor: "pointer"}}></i></a>
          <a href='https://www.linkedin.com' target="_blank" rel='noreferrer'><i className="follow-icon fa-brands fa-linkedin" style={{cursor: "pointer"}}></i></a>
        </div>
      </div>
      
    </div>
  )
}

export default Sidebar;
