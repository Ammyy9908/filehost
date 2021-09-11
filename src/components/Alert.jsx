import React from 'react'
import "./Alert.css"
import {FiX,FiArrowRight} from "react-icons/fi"

function Alert({error,setError}) {


    const handleClose = (e)=>{
        console.log(e.target);
        if(e.target.classList.contains("modal")){
            setError(false);
        }
    }

    return (
        <div className={`modal ${error && "modal__enable"}`} onClick={handleClose}>
            <div className="modal-popup">
                <div className="modal_wrapper">
                        <div className="modal_icon">
                            <FiX/>
                        </div>
                        <h3>Authentication Error</h3>
                        <p>{error}</p>
                        <button className="modal_close_btn" onClick={()=>setError(false)}>Try Again! <FiArrowRight/></button>
                </div>
            </div>
        </div>
    )
}

export default Alert