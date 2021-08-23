import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Auth from './pages/Auth';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import {setUser} from "./redux/actions/_appAction"
function App(props) {
  console.log(props)
  React.useEffect(()=>{
    Cookies.get("AUTH_TOKEN") && axios.get('http://localhost:5000/auth/user',{
      headers:{
        "Authorization":Cookies.get('AUTH_TOKEN')
      }
    }).then((response)=>{
      console.log(response);
      props.setUser(response.data)
    }).catch((e)=>{
      console.log(e);
    })
  },[]);

  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
    <Home/>
    </Route>

    <Route exact path="/login">
    <Home/>
    </Route>
    <Route
          exact
            path="/auth/:type"
            render={(props) => {
              const type = props.match.params.type;
              return <Auth type={type && type} />;
            }}
           
          />

   
   
  </Switch>
</div>
</Router>
  );
}


const mapDispatchToProps = (dispatch)=>({
  setUser:(user)=>dispatch(setUser(user))
})

export default connect(null,mapDispatchToProps)(App);
