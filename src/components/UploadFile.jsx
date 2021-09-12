import React from 'react'
function UploadFile({progress,filename}) {
    return (
        <div className="file__status">
                            <div className="file_status__header">
                                <span>Uploading 1 file <span>{progress}%</span></span>
                                {/* <div className="file_upload_controls">
                                    <button><FiPauseCircle/></button>
                                    <button><FiX/></button>
                                </div> */}
                            </div>
                            <div className="file_upload_progress__info">
                                <span>{filename}</span>
                                <div className="progress__main">
                                    <div className="progress__value" style={{width:progress+"%"}}>

                                    </div>
                                </div>
                            </div>
                        </div>
    )
}

export default UploadFile
