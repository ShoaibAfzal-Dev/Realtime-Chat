import './App.scss';
import {BrowserRouter ,Routes,Route} from "react-router-dom" 
import Login from './Components/Login';
import Registration from './Components/Registration';
import Chat from './Components/Chat';
import NotFound from './Components/NotFound';
import Avatar from './Components/Avatar';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route exact path='/' element={<Login/>}/>   
           <Route path='/register' element={<Registration/>}/>
           <Route path='/avatar' element={<Avatar/>}/>
           <Route path='/chat' element={<Chat/>}/>   
             <Route path='*' element={<NotFound/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
