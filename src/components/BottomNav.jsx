import React from 'react'
import {FiHardDrive,FiUsers,FiTrash,FiUser} from "react-icons/fi"
import { connect } from 'react-redux'
import { addFile, setCurrentPage, setPublicFiles } from '../redux/actions/_appAction'
import "./BottomNav.css"
function BottomNav(props) {

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
        {
            id:4,
            text:"Public",
            icon:FiUser,
            path:"public"
        }
        
    ]


    return (
        <div className="bottom-nav">

            <button className="bottom-new-file">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="#34A853" d="M16 16v14h4V20z"/><path fill="#4285F4" d="M30 16H20l-4 4h14z"/><path fill="#FBBC05" d="M6 16v4h10l4-4z"/><path fill="#EA4335" d="M20 16V6h-4v14z"/><path fill="none" d="M0 0h36v36H0z"/></svg> 
            </button>
            <ul className="bottom-nav-list">
                {
                    options.map((option)=>{
                        return (
                            <li className={`nav-item ${option.path===props.current_page && "active_option"}`} onClick={()=>props.setCurrentPage(option.path)}>
                                <a href="#">
                                    {<option.icon/>}
                                    </a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user,
    public_files:state.appReducer.public_files,
    current_page:state.appReducer.current_page
})

const mapDispatchToProps = (dispatch)=>({
    setPublicFiles:(public_files)=>dispatch(setPublicFiles(public_files)),
    addFile:(file)=>dispatch(addFile(file)),
    setCurrentPage:(current_page)=>dispatch(setCurrentPage(current_page))
})
export default connect(mapStateToProps,mapDispatchToProps)(BottomNav)
