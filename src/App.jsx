import React, { useState} from 'react';
import {  Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
// import Users from './pages/Users'



const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  

  return (
    
    
        <Routes>
          <Route path="/login" element={authenticated ? (<Link to="/home" /> ) : (
                <Login setAuthenticated={setAuthenticated} />
              )
            }
          />
          <Route path="/signup" element={ authenticated ? (<Link to="/home" />
              ) : (
                <Signup setAuthenticated={setAuthenticated} />
              )
            }
          />
          <Route path="/home"  element={authenticated ? ( <Home setAuthenticated={setAuthenticated} />
              ) : (
                <Link to="/login" />
              )
            }
          />

          {/* <Route path='/users' element={authenticated? (<Users setAuthenticated={setAuthenticated}/>):
          (<Link to ='/login'/>)}/> */}
          
        </Routes>
       
  
    
  );
};

export default App;







