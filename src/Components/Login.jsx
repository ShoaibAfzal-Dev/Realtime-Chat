import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Login.scss"
const Login = () => {
  const navigator=useNavigate()
  const [dat,setData]=useState({
    username:"",
    password:""
  })
  function Changedata(e){
    setData({
      ...dat,
      [e.target.name]:e.target.value
    })
  }

  const dataSubmitted=async(e)=>{
    e.preventDefault()
    const {data}=await  axios.post("http://localhost:4000/data/login" , dat)
    console.log(data)
    if(!data.success){
      const notify = () => {
        toast.error(`${data.error}`, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      notify();
      return
    }
    else{
navigator("/chat",{state:data.user})
    }
  }
  return (
    <div className="login-page">
        <div className="login-left">
        <h1>Welcome</h1>
        <form onSubmit={dataSubmitted}>
            <input 
            required
            autoComplete='off'
            type="text" 
            placeholder='Username'
            name='username'
            value={dat.username}
            onChange={Changedata}
            />
            <input 
            required
            autoComplete='off'
            type="password" 
            placeholder='Password'
            name='password'
            value={dat.password}
            onChange={Changedata}
            />
            <button type='submit'>LOGIN</button>
            <ToastContainer/>
        </form>
       <Link to={'/register'}> <h4>Dont you have an Account?</h4></Link>
        </div>
        <div className="login-right">
            <img src="chat.png" alt="Logo" />
        </div>
    </div>
  )
}

export default Login