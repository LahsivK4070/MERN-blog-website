import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import { Link } from "react-router-dom";
import "./login.css"
import { Context } from '../../context/Context';
import axios from "axios";
import { useState } from 'react';

const Login = () => {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [isInvalid, setInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("api/auth/login", {
        userName: userRef.current.value,
        password: passwordRef.current.value
      });
      if (res) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } else {
        setInvalid(true);
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } catch (error) {
      setInvalid(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  
  return (
    <div className='login'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" name="loginEmail" required={true} id="login-email" ref={userRef} placeholder='Enter username...' autoFocus={ true } />
              <input type="password" name="loginPass" required={true} id="login-pass" ref={passwordRef} placeholder='Enter password...' />
              <button type="submit" className='login-btn' disabled={ isFetching }>Login</button>
          </form>
      <button type="button" className='register-btn'>
        <Link to="/register" className='link'>Register</Link>
      </button>
      {isInvalid && <span style={{ color: "red", textAlign: "center", marginTop: "1rem", fontSize: "20px", fontFamily: "sans-serif" }}>Wrong Credentials</span>}
    </div>
  )
}

export default Login
