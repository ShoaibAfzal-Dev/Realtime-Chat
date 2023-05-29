import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Registration = () => {
  const navigator = useNavigate()
  const [dat, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  function Datachange(e) {
    setData({
      ...dat,
      [e.target.name]: e.target.value
    })
  }
  
  const submittedData = async (e) => {
    e.preventDefault()
    console.log(dat)
    if(dat.password!==dat.confirmPassword){
      const notify = () => {
        toast.error("Passwords shoud be same!", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      notify();
      return
    }
    if(dat.password.length<8){
      const notify = () => {
        toast.error("Passwords shoud be more than 8 characters!", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      notify();
      return
    }
    try {
      
      const {data} = await axios.post("http://localhost:4000/data/register", dat)
      console.log(data)
      if(!data.success){
        const notify = () => {
          toast.error(`${data.error}` , {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
        notify();
        return
      }
      else{
       navigator("/avatar",{state:{dat}})
      }
    } catch (error) {
      console.log(error)
    }

  
  }
  return (
    <div className="register-page">
      <div className="register-left">
        <h1>Register Here</h1>
        <form onSubmit={submittedData}>
          <input
            required
            autoComplete='off'
            type="text"
            placeholder='Username'
            name='username'
            value={dat.username}
            onChange={Datachange}
          />
          <input
            required
            type="email"
            autoComplete='off'
            placeholder='E-Mail'
            name='email'
            value={dat.email}
            onChange={Datachange}
          />
          <input
            required
            autoComplete='off'
            type="password"
            placeholder='Password'
            name='password'
            value={dat.password}
            onChange={Datachange}
          />
          <input
          autoComplete='off'
            required
            type="password"
            placeholder='Confirm Password'
            name='confirmPassword'
            value={dat.confirmPassword}
            onChange={Datachange}
          />
          
          <button type='submit'>SIGNUP</button>
          <ToastContainer />
        </form>
      </div>
      <div className="register-right">
        <img src="Chat.png" alt="logo" /></div>
    </div>
  )
}

export default Registration