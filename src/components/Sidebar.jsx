import React from 'react'
import "./Sidebar.css"
// eslint-disable-next-line
import {FiUploadCloud,FiShare2,FiHardDrive,FiUsers,FiTrash,FiUser} from "react-icons/fi"
import { addFile, setCurrentPage, setPublicFiles, setUser } from '../redux/actions/_appAction'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


function Option({Icon,text,url,current_page,setCurrentPage}){
    return (<Link to={`/dashboard/${url}`}><span class={`option-item ${current_page===url && "option-item_active"}`}>
        {<Icon/>}
            {text}
    </span></Link>)
}
function Sidebar(props) {

    const options = [

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
       
        
    ]


    const history = useHistory()
    const logout =()=>{
        
        Cookies.remove('AUTH_TOKEN')
        props.setUser(null);
        history.push('/auth/login');
    }


    return (
        <div className="sidebar">
                <div className="sidbar__header">
                    <span className="brand_name">FileHost</span>
                </div>
                <div className="sidebar_options">
                    
                    {
                            options.map((option)=>{
                                return <Option text={option.text} Icon={option.icon} url={option.path} current_page={props.current_page} setCurrentPage={props.setCurrentPage}/>
                            })
                    }

                </div>

                <div className="user__footer">
                    <button onClick={logout}>Logout</button>
                </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user,
    public_files:state.appReducer.public_files,
    current_page:state.appReducer.current_page
})

const mapDispatchToProps = (dispatch)=>({
    setUser:(user)=>dispatch(setUser(user)),
    setPublicFiles:(public_files)=>dispatch(setPublicFiles(public_files)),
    addFile:(file)=>dispatch(addFile(file)),
    setCurrentPage:(current_page)=>dispatch(setCurrentPage(current_page))
})
export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
