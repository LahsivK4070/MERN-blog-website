import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./register.css"
import axios from "axios";

const Register = () => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res =await axios.post("http://localhost:5000/api/auth/register/", {
        userName,
        password,
        email,
      });
      setUserName("");
      setEmail("");
      setPassword("");
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className='register'>
        <h1>Register</h1>
          <form onSubmit={handleSubmit}>
        <input type="text" name="registerName" id="register-name" placeholder='Enter username' autoFocus={true} required={true} onChange={(e)=>{setUserName(e.target.value)}} />
        <input type="email" name="registerEmail" id="register-email" placeholder='Enter email' onChange={(e) => { setEmail(e.target.value) }} required={true} />
              <input type="password" name="registerPass" id="register-pass" placeholder='Enter password' onChange={(e)=>{setPassword(e.target.value)}} required={true}/>
              <button type="submit" className='register-btn-2'>Register</button>
          </form>
      <button className='login-btn-2'>
        <Link to="/login" className='link'>Login</Link>
      </button>
      {error && <span style={{ color: "red", textAlign: "center", marginTop: "1rem", fontSize: "20px", fontFamily: "sans-serif"}}>Something went wrong!</span>}
    </div>
  )
}

export default Register
