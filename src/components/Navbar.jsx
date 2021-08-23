import Cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import "./Navbar.css"


function Navbar(props) {

    const handleLogout = ()=>{
        Cookies.remove("AUTH_TOKEN");
        window.location.href="/";
    }
    return (
        <div className="header">
            <div className="header__wrapper">
                <a href="#" className="brand_name">FileHost</a>
               
                   <ul className="navbar">
                       <li><a href="#" className="active_link">Home</a></li>
                      {!props.user &&  <li><a href="/auth/login">Login</a></li>}
                       {props.user && <li><a href="#" onClick={handleLogout}>Logout</a></li>}
                   </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>({
    user:state.appReducer.user
})
export default connect(mapStateToProps,null)(Navbar)
