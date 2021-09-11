import React from 'react'
import {FiPauseCircle,FiX} from "react-icons/fi"
function UploadFile() {
    return (
        <div className="file__status">
                            <div className="file_status__header">
                                <span>Uploading 1 file <span>70%</span></span>
                                <div className="file_upload_controls">
                                    <button><FiPauseCircle/></button>
                                    <button><FiX/></button>
                                </div>
                            </div>
                            <div className="file_upload_progress__info">
                                <span>Filename</span>
                                <div className="progress__main">
                                    <div className="progress__value">

                                    </div>
                                </div>
                            </div>
                        </div>
    )
}

export default UploadFile
