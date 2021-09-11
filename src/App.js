import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Auth from './pages/Auth';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import {setUser} from "./redux/actions/_appAction"
import dotenv from "dotenv"
import Dashboard from './pages/Dashboard';
dotenv.config()
function App(props) {
  console.log(props)
  React.useEffect(()=>{
    Cookies.get("AUTH_TOKEN") && axios.get(`https://fileehostt.herokuapp.com/auth/user`,{
      headers:{
        "Authorization":Cookies.get('AUTH_TOKEN')
      }
    }).then((response)=>{
      console.log(response);
      props.setUser(response.data)
    }).catch((e)=>{
      console.log(e);
    })
  },
  // eslint-disable-next-line
  []);

  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
    <h1>HomePage</h1>
    </Route>
    <Route
          exact
            path="/dashboard/:type"
            render={(props) => {
              const type = props.match.params.type;
              return <Dashboard type={type && type} />;
            }}
           
          />
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
