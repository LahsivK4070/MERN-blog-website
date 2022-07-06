import React from 'react';
import "./home.css";
import Header from '../header/Header.jsx';
import Posts from "../posts/Posts";
import Sidebar from "../sidebar/Sidebar";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {  
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data); 
    }
    fetchPosts();
  }, [search])  // [] is used to use useeffect only one in the beginning

  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={ posts } />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home;
