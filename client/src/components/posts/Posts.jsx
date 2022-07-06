import React from 'react';
import Post from "../post/Post";
import "./posts.css";

const Posts = (props) => {
  return (
    <div className='posts'>
      {props.posts.map
        ((post) => {
          return <Post key={post._id} post={ post } />
     })}
    </div>
  )
}

export default Posts;
