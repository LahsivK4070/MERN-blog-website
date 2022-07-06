import React, {useState} from 'react'
import { useContext } from 'react';
import "./settings.css";
import { Context } from "../../context/Context";
import axios from 'axios';

const Settings = () => {

  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [userName, setUsername] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      userName,
      email,
      password
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;
      try {
        await axios.post("http://localhost:5000/api/upload/", data);
      } catch (error) {
        // TO DO
      }
    }
    try {
      const res = await axios.put("http://localhost:5000/api/user/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (error) {
      dispatch({type: "UPDATE_FAILURE"})
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/?user=" + user.userName);
      await axios.delete("http://localhost:5000/api/user/" + user._id, { data: { userId: user._id } });
      localStorage.setItem("user", null);
      window.location.replace("/");
      alert("Account deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='setting-component'>
          <div className='setting-component-heading'>
              <p className='setting-update'>Upadate Your Account</p>
              <p className='setting-delete' onClick={handleDelete}>Delete Account</p>
          </div>
          <div className="setting-component-info">
              <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} className='setting-profile' alt='setting-profile-img' />
              <div className='setting-details'>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor='setting-img' className='setting-img-label'><i className="setting-user fa-solid fa-user"></i> Change Profile</label>
            <input type="file" name="settingImg" onChange={(e) => { setFile(e.target.files[0]) }} id="setting-img" style={{ display: "none" }} />
                      <label htmlFor='setting-name' className='setting-name-label'>Username</label>
                      <input type="text" name="userName" id="setting-name" placeholder={user.userName} onChange={ (e)=> {setUsername(e.target.value)}} autoFocus={ true }/>
                      <label htmlFor='setting-email' className='setting-email-label'>Email</label>
                      <input type="email" name="email" id="setting-email" placeholder={user.email} onChange={ (e)=> {setEmail(e.target.value)}}/>
                      <label htmlFor="setting-password" className='setting-pass-label'>Password</label>
                      <input type="password" name="password" required={true} id="setting-password" onChange={ (e)=> {setPassword(e.target.value)}}/>
                      <button type="submit">Update</button>
                  </form>
        </div>
        {success && <span style={{color: "green", textAlign: "center", marginTop: "1rem", fontSize: "20px", fontFamily: "sans-serif"}}>Successfully Updated</span>}
          </div>
    </div>
  )
}

export default Settings
