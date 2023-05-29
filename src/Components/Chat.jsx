import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { all } from "axios"
import Meaasges from './Meaasges';
import { io } from "socket.io-client"
import Loader from './Loader';
const Chat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const socket = useRef();
  const [value, setValue] = useState(null)
  const [allusers, setAllusers] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state
  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:4000")
      socket.current.emit("add-user", user.username)
    }
  }, [user])
  console.log(allusers)

  let u = null;
  if (allusers) {
    u = allusers.filter((s) => {
      return user.username !== s.username;
    });
  }
  // console.log(u);

  const chagedata = (e) => {
    const h3Element = e.currentTarget.querySelector('h3');
    if (h3Element) {
      const h3Data = h3Element.textContent;
      setValue(h3Data)
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('http://localhost:4000/data');
        setAllusers(data.all);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const cons = {
    SendBy: user.username,
    ReceivedBy: value
  }
  console.log(u)
  console.log(user)
  return (
    <div className="main-chat-page">
      <div className="center-chat">

        <div className="chat-left">
          <div className="user-profile-data">
            {user ? <>
              <div className="user-podata">
                <img src={user.image} alt="profile" />
                <h1>{user.username}</h1>
              </div>
            </> : <></>}
          </div>
          {u ? (
            u.map((user) => (
              <div className="profile" onClick={chagedata} key={user._id}>
                <img src={user.image} alt="Profile pic" />
                <div className="profile-data">
                  <h3>{user.username}</h3>
                </div>
              </div>
            ))
          ) : (
            <><Loader /></>
          )}
        </div>
        <div className="chat-right">

          {value ? <>
            <div className="chat-data">
              <Meaasges props={cons} socket={socket} />
            </div>
          </> : <><h1>Welcome to</h1>
            <img src="Chat.png" alt="main" /></>}
        </div>

      </div>
    </div>
  )
}

export default Chat





