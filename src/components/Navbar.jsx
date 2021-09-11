import Cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import {FiMenu} from "react-icons/fi"
import "./Navbar.css"


function Navbar(props) {

    const handleLogout = ()=>{
        Cookies.remove("AUTH_TOKEN");
        window.location.href="/";
    }

    const handleHamburger = ()=>{
        console.log("working");
        props.setSidebar(!props.sidebar)
    }
    return (
        <div className="header">
            <div className="header__wrapper">
               <div className="left__nav">
               <button onClick={handleHamburger} className="hamburger">
                <FiMenu/>
                </button>
                <a href="/" className="brand_name">FileHost</a>
               </div>
               
                   <ul className="navbar">
                      {!props.user &&  <li><a href="/auth/login">Login</a></li>}
                       {props.user && <li><a href="/" onClick={handleLogout}>Logout</a></li>}
                   </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>({
    user:state.appReducer.user
})
export default connect(mapStateToProps,null)(Navbar)
