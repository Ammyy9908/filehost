import React from 'react'
import "./MobileNav.css"
import {FiHardDrive,FiUsers,FiTrash,FiEdit2} from "react-icons/fi"
import { connect } from 'react-redux'
import { setCurrentPage, setEditForm, setMobileNav, setUser } from '../redux/actions/_appAction'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'


function Option({Icon,text,path,current_page}){
    return (
        <li className={`${current_page===path&& "active_path"} `}><Link to={`/dashboard/${path}`}>{<Icon/>}{text}</Link></li>
    )
}
function MobileNav(props) {


    const history = useHistory()

    const logout = ()=>{
        props.setUser(null)
        Cookies.remove('AUTH_TOKEN')
        history.push('/auth/login');

    }


    const handleEditForm =()=>{
        props.setMobileNav(false)
        props.setEditForm(true)

    }
    return (
        <div className={`mobile-nav ${props.mobile_nav && "mobile_nav_enable"}`}>
            <div className="mobile_nav__wrapper">
                <div className="mobile_nav__header">
                    <span>App Name</span>
                </div>
                <div className="nav__divider"></div>

                <div className="nav__user__bar">
                    <button className="user_profile_edit_btn" onClick={handleEditForm}>
                        <FiEdit2/>
                    </button>
                    <div className="nav_user_avatar">
                        {props.user && props.user.avatar && <img src={props.user.avatar} alt="user__avatar"/>}
                    </div>
                    <div className="nav__user__detail">
                        <span>{props.user && props.user.name}</span>
                        <p>{props.user && props.user.email}</p>
                    </div>
                </div>

                <ul className="nav__options">
                    {
                    [

                        {
                            id:1,
                            text:"My Drive",
                            icon:FiHardDrive,
                            path:"drive"
                        },
                        {
                            id:2,
                            text:"Shared with me",
                            icon:FiUsers,
                            path:"shared"
                        },
                        {
                            id:3,
                            text:"Trash",
                            icon:FiTrash,
                            path:"trash"
                        },
                        
                        
                    ].map((option)=>{
                        return <Option Icon={option.icon} text={option.text} path={option.path} setCurrentPage={props.setCurrentPage} current_page={props.current_page}/>
                    })
                    }
                </ul>

               
                <button className="logout_btn_nav" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user,
    public_files:state.appReducer.public_files,
    current_page:state.appReducer.current_page,
    myfiles:state.appReducer.myfiles,
    mobile_nav:state.appReducer.mobile_nav

})

const mapDispatchToProps = (dispatch)=>({

    setCurrentPage:(current_page)=>dispatch(setCurrentPage(current_page)),
    setUser:(user)=>dispatch(setUser(user)),
    setEditForm:(form_edit)=>dispatch(setEditForm(form_edit)),
    setMobileNav:(mobile_nav)=>dispatch(setMobileNav(mobile_nav))
    
})

export default connect(mapStateToProps,mapDispatchToProps)(MobileNav)
