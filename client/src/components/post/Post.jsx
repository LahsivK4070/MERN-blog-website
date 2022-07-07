import React from 'react'
import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  const PF = "images/";
  return (
    <div className='post'>
      { post.photo && (<img src={PF + post.photo} alt='post-img' />) }
      <p className='post-category'>{post.category.map((cat) => {
        return <span key={post.createdAt}>{ cat } </span>
      })}</p>
      <p className='post-date'>{new Date(post.createdAt).toDateString()}</p>
      <Link to={`/post/${post._id}`} className="link"><p className='post-title' style={{cursor: "pointer"}}>{ post.title }</p></Link>
      <p className='post-desc'>{ post.desc }</p>
    </div>
  )
}

export default Post
