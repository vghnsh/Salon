import React, { useEffect, useState } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import  {db,auth} from './firebase';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SignIn from './Components/signin';
import {Button, IconButton} from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
  

toast.configure()
function App() {
  const [user,setUser] = useState([]);
  const [number, setNumber] = useState([]);


  
   

  const signOut=(event)=>{
    event.preventDefault();
    auth.signOut();
    setUser("");
  };

 


  function up(){
    db.collection('salon').doc('dSs4KJF6t4xN5KVAaaOI').set({
      waiting:  number + 1
    });
    toast("Waiting Increased by 1",{position:toast.POSITION.BOTTOM_RIGHT ,autoClose: 2500});
  }

  function down(){
    db.collection('salon').doc('dSs4KJF6t4xN5KVAaaOI').set({
      waiting:  number - 1
    });
    toast("Waiting Decreased by 1",{position:toast.POSITION.BOTTOM_RIGHT,autoClose: 2500});
  
  }
 

  useEffect(()=>{

    db.collection('salon').doc('dSs4KJF6t4xN5KVAaaOI').onSnapshot(snapshot=>{
      setNumber(snapshot.data().waiting);
      console.log(snapshot.data().waiting);
    });

    const unsub = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser);
      }
    })
    console.log(auth);

    return()=>{
      unsub();
    };
    
  },[number]);

  

  return (
    
    
    <div className="App" >

      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn></SignIn>
          </Route>

          <Route path="/">
          <header className="header">
              <div className="logo size name">
                <b>MySalon</b>
              </div>
              <div className="login size">
                {
                  user?.email?
                  <Button className="name" variant="contained" color="primary" onClick={signOut} >
                   <b>LogOut</b> 
                  </Button>
                  :
                  <Link to="/signin" >
                    <Button className="name" variant="contained" color="primary" >
                    <b>LogIn</b>

                    </Button>
                  </Link>
                }
               
                
              </div>
          </header>

            <div className="main" 
            style={
                    {
                      backgroundImage:"url(https://img2.pngio.com/men-hair-style-hand-drawn-transparent-png-svg-vector-hair-drawing-png-512_512.png)",
                      objectFit:'contain',
                      backgroundPosition:'center',
                      backgroundRepeat:'no-repeat'
                      
                    }
              } >
              
              <div className="content">
              <div className="sizeW name">
                Waiting
              </div>
              <div className="c1">
              <Fade top big>
              <div className=" name sizeW_number">
                {
                  number  
                }
              </div>
              </Fade>
              

              {
                user?.email? 
                <div className="change">
                  <IconButton onClick={up}>
                  <ExpandLessIcon />
                  </IconButton>

                  <IconButton disabled={number < 1} onClick={down} >
                  <ExpandMoreIcon />
                  </IconButton>
                
                  

      
                 
                </div> : ''
              }
              </div>
              </div>
             
        </div>
        <div
            className="fade_bot">
            </div>
          </Route>
        </Switch>
      </Router>
     
    </div>
    
  );
}

export default App;
