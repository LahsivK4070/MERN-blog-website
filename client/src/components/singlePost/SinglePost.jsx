import React from 'react'
import { useEffect } from 'react';
import { useLocation } from "react-router";
import "./singlePost.css";
import axios from "axios"
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';

const SinglePost = () => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const url = "http://localhost:5000/api/posts/";
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(url + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + path, { data: { userName: user.userName } });
      window.location.replace("/");  
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/posts/" + path, { userName: user.userName, title, desc });
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <div className='single-post'>
      <div className='single-post-head'>
        {post.photo && (<img src={PF + post.photo} className='single-post-head-img' alt='single-post-img' />)}
        {post.category && <p className='post-category'>{post.category.map((cat) => {
        return <span>{ cat } </span>
      })}</p>}
        {post.userName === user?.userName &&
          <div className='edit-del-btn'>
            <i className="fa-solid edit-btn fa-pen-to-square" onClick={() => { setUpdateMode(true) }} style={{display: updateMode ? "none" : "inline"}}></i>
            <i className="fa-solid del-btn fa-trash-can" onClick={handleDelete} style={{display: updateMode ? "none" : "inline"}}></i>
          </div>
        }
        { updateMode ? <input type="text" value={title} autoFocus={true} className="single-post-title-input" onChange={(e)=> setTitle(e.target.value)}/> : <h1 className='single-post-title'>{title}</h1>}
          </div>
          <div className='single-post-author-div'>
              <p className='single-post-author' style={{cursor: "pointer"}}>Author: <Link to={`/?user=${post.userName}`} className="link"><strong>{post.userName}</strong></Link></p>
        <p className='single-post-time'>{ new Date(post.createdAt).toDateString() }</p>
      </div>
      {updateMode ? <textarea value={desc} onChange={(e)=> setDesc(e.target.value)} className="single-post-desc-input"/> : (
        <div className='single-post-desc'>
          <p>{ desc }</p>
        </div>
      )}
      {updateMode && <div className='update-div'><button type="btn" onClick={handleUpdate} className='update-btn'>Update</button></div>}
    </div>
  )
}

export default SinglePost
