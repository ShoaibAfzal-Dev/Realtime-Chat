import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFillEmojiSmileFill } from "react-icons/bs";
import Picker from 'emoji-picker-react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Loader from './Loader';


const Meaasges = ({ props, socket }) => {


    const [msg, setMsg] = useState()
    const [cr, setCr] = useState([]);
    const [rMsg, setrMsg] = useState();
    const d = props

    let cx;
    if (msg) {
        cx = msg.filter((s) => {
            return s.SendBy === d.SendBy && s.ReceivedBy === d.ReceivedBy || s.ReceivedBy === d.SendBy && s.SendBy === d.ReceivedBy
        })
    }
     
    useEffect(() => {
        cx = ''
        async function usersdata() {
            try {
                const { data } = await axios.get("http://localhost:4000/get")
                setMsg(data.gh)
            } catch (error) {
                // console.log(error)
            }
        }
        usersdata()
    }, [d])
    const [input, setInput] = useState({
        message: ""
    })
    const updatemsg = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const finaldata = {
        ...d,
        ...input
    }
    const sendData = async (e) => {
        e.preventDefault();
        if (input.message === "") {
            return
        }
        else {

            await axios.post("http://localhost:4000/sent", finaldata)
            socket.current.emit("send-msg", {
                SendBy: finaldata.SendBy,
                ReceivedBy: finaldata.ReceivedBy,
                message: finaldata.message
            })

            setCr((prevCx) => [...prevCx, finaldata]);


        }

        setInput({
            message: ""
        })

    }

    useEffect(() => {
        cx = [
            ...cx,
            ...cr
        ]
        setMsg(cx)
    }, [cr])
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (er) => {
                setCr((prevCx) => [...prevCx, er]);
            });
        }
    }, [socket.current]);
    useEffect(() => {
        if (rMsg) {
            cx = [
                ...cx,
                rMsg
            ]
            // console.log(cx)
        }
    }, [rMsg])
    const clicked = () => {
        console.log("bchjcd")
    }
    const [showPicker, setShowPicker] = useState(false);
    const handleEmojiClick = (emojiObject) => {
        const { emoji } = emojiObject;
        setInput((prevState) => ({
            ...prevState,
            message: prevState.message + emoji
        }));
        setShowPicker(false);
    };

    const handleEmojiButtonClick = () => {
        setShowPicker(!showPicker);
    };
    return (
        <div>
            {
                cx ?
                    cx.map((s) => (
                        <div key={s._id}>
                            <ScrollToBottom>
                                {
                                    s.SendBy === d.SendBy ?
                                        <>
                                            <div className="right-side-data">
                                                <h1>{s.message}</h1>
                                                {/* <p>{s.time}</p> */}
                                            </div>
                                        </> : <>
                                            <div className="left-side-data">
                                                <h1>{s.message}</h1>
                                            </div>
                                        </>
                                }</ScrollToBottom>
                        </div>
                    )) : <><Loader/></>
            }
            {showPicker && (
                <Picker className="main-icons" onEmojiClick={handleEmojiClick} />
            )}
            <div className="text-field">

                <form onSubmit={sendData} >
                    <div className="emoji">
                        <BsFillEmojiSmileFill
                            onClick={handleEmojiButtonClick} />
                    </div>
                    <input
                        autoComplete='off'
                        type="text"
                        name='message'
                        value={input.message}
                        onChange={updatemsg}
                    />
                    <button type='submit'>
                        <p>Send</p></button>
                </form>
            </div>
        </div>
    )
}

export default Meaasges