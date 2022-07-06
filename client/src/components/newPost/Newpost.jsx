import React, {useState} from 'react';
import { useContext } from 'react';
import "./newPost.css";
import { Context } from "../../context/Context";
import axios from "axios";
import Tags from "../tags/Tags";

const Newpost = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || desc === "") {
      alert("Write Something first");
    } else {
      const newPost = {
        userName: user.userName,
        title,
        desc,
        category: tags 
      };
      if (tags) {
        const tag = {
          name: tags
        };

        try {
          await axios.post("api/categories/", tag);
        } catch (error) {
          
        }
      }
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.photo = fileName;
        try {
          await axios.post("api/upload/", data);
        } catch (error) {
          // TO DO
        }
      }
      try {
        const res = await axios.post("api/posts/", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (error) {
        // TO DO
      }
    }
  }

    function handleKeyDown(e){
        if(e.key !== " ") return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

  return (
    <div className='write-post'>
      <div className='write-post-div'>
          {file && <img src={URL.createObjectURL(file)} alt='newPost-img' />}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='newPost-file-div'>
            <label htmlFor="newPost-img" className='newPost-img-btn'>+</label>
          <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} name="newPost-img" id="newPost-img" style={{ display: "none" }} /> 
          <Tags tags={tags} setTags={setTags} handleKeyDown={handleKeyDown} removeTag={ removeTag } />
        </div>
            <input type="text" onChange={(e) => {setTitle(e.target.value)}} className='write-title' placeholder="Add title ..." autoFocus={true} />
            <textarea name="newPost-desc" onChange={(e) => {setDesc(e.target.value)}} id="newPost-desc" cols="30" rows="10" placeholder='Write Something ...'/>
            <button className='submitPost' type='submit'>Publish</button>
          </form>
    </div>
  )
}

export default Newpost;
