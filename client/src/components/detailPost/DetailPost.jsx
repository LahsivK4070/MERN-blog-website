import React from 'react'
import { useEffect } from 'react';
import Sidebar from "../sidebar/Sidebar";
import SinglePost from '../singlePost/SinglePost';
import "./detailPost.css";

const DetailPost = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='detail-post'>
          <SinglePost />
          <Sidebar />
    </div>
  )
}

export default DetailPost
