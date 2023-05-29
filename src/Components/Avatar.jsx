
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Avatar = () => {
  const nav=useNavigate()
  const location = useLocation();
  const data = location.state.dat;
  const [objects, setObjects] = useState(data);
  const [url, setUrl] = useState([]);
  const [selected, setSelected] = useState('');
    
  useEffect(() => {
    const fetchAvatar = () => {
      const newUrls = [];
      for (let p = 0; p < 10; p++) {
        const api = `https://robohash.org/${Math.round(
          Math.random() * 23454385456754
        )}`;
        newUrls.push(api);
      }
      setUrl(newUrls);
    };

    fetchAvatar();
  }, []);

  const handleClick = (clickedUrl) => {
    console.log('Clicked URL:', clickedUrl);
    setSelected(clickedUrl);
  };

  const submitPic = async () => {
    setObjects(prev => ({
      ...prev,
      image: selected
    }));
   
    if(objects.image){
      console.log(objects)
      const {data} = await axios.post("http://localhost:4000/data/set-profile", objects)
     nav("/")
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
     navigator("/")
    }
    }
    else{

    }
  };

  return (
    <>
    <div className="avatar-container">
      {url.map((avatarUrl) => (
        <img
        className='avatar-image'
          key={avatarUrl}
          src={avatarUrl}
          alt="Avatar"
          onClick={() => handleClick(avatarUrl)}
        />
      ))}
      
    </div><button onClick={submitPic}>Set Profile Pic</button></>
  );
};

export default Avatar;
