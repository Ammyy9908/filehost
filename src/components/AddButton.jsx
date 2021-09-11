import React from 'react'
import {FcPicture,FcDocument} from "react-icons/fc"
function AddButton() {
    const [isEnabled,setEnabled] = React.useState(false);

    const file_options = [
        {id:1,
        text:"Picture Upload",
        icon:FcPicture
        },
        {
            id:2,
            text:"Document Upload",
            icon:FcDocument
        }
    ]


    const handleEnable = (e)=>{
        if(e.target.classList.contains("new_file_btn")){
            setEnabled(!isEnabled);
        }
    }
    return (
        <button className={`new_file_btn`} onClick={handleEnable}>

            <div className={`new_file_dropdown ${isEnabled && "new_file_dropdown_enable"}`}>
                {
                    file_options.map((option)=>{
                        return <span className="file-item">
                            {
                                <option.icon/>
                            }
                            {
                                option.text
                            }
                        </span>
                    })
                }
            </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="#34A853" d="M16 16v14h4V20z"/><path fill="#4285F4" d="M30 16H20l-4 4h14z"/><path fill="#FBBC05" d="M6 16v4h10l4-4z"/><path fill="#EA4335" d="M20 16V6h-4v14z"/><path fill="none" d="M0 0h36v36H0z"/></svg> 
                    
                    <span>New</span>
                    </button>
    )
}

export default AddButton
