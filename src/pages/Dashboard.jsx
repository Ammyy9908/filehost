import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import firebase from "firebase"
import axios from 'axios';
import { addFile, addTrash, restoreTrash, setCurrentPage, setEditForm, setFavourites, setMobileNav, setMyFiles, setPublicFiles, setTrash } from '../redux/actions/_appAction';
import Notify from "../utils/notification"
import Sidebar from '../components/Sidebar'
// eslint-disable-next-line
import storage from '../config/firebase'
import "./Dashboard.css"
import {FiUpload,FiBell,FiMenu,FiTrash,FiRotateCcw} from "react-icons/fi"
import {FcPicture,FcDocument} from "react-icons/fc"
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import UploadFile from '../components/UploadFile';
import MobileNav from '../components/MobileNav';
import Overlay from '../components/Overlay';
import UserProfileUpdate from '../components/UserProfileUpdate';
import {motion} from "framer-motion"
import pdficon from "../pdficon.svg"
import character from "../assets/character1.svg"
import empty from "../assets/empty.png"
import word from "../assets/word_icon.png"
import excel from "../assets/excel.svg"


function FileCard({type,kind,name,id,addTrash,inTrash,restoreTrash,trash,myfiles}){

    const moveToTrash = ()=>{

        axios.put(`https://fileehostt.herokuapp.com/file/trash/${id}`).then((response)=>{
            console.log(response);

            if(response.status===200){
                addTrash(id);
                Notify("File Moved to Trash Successfully!","/dashboard/trash")
            }

        }).catch((e)=>{
            console.log(e);
        })
    }


    const restore = ()=>{

        axios.put(`https://fileehostt.herokuapp.com/file/untrash/${id}`).then((response)=>{
            console.log(response);

            if(response.status===200){
                restoreTrash(id);
                Notify("File Restored from Trash Successfully!","/dashboard/drive")
            }

        }).catch((e)=>{
            console.log(e);
        })
    }

    return <motion.div className="favourite_card" layout={true} whileHover={{opacity:.9}}>
        <div className={`card__content ${type+"__card"}`}>
        <div className="card__header">
           
            <button className="file_more" title={inTrash?"Restore From Trash":"Move to Trash"} onClick={inTrash &&  trash.findIndex((file)=>file._id===id)>=0?restore:moveToTrash}>
                {inTrash  &&  trash.findIndex((file)=>file._id===id)>=0?<FiRotateCcw/>:<FiTrash/>}
                
            </button>
        </div>
        <div className="card__thumb">
            {type==="file"?<FcPicture/>:<FcDocument/>}
        </div>
        </div>

        <div className="card__footer">
            <h3>{name}</h3>
        </div>


    </motion.div>
}

function FileUsageCard({type,total_files,files}){
    console.log("Files are",files);
    let size = 0;

    files && files.forEach((file)=>{
        size+=+file.size+size
    })
    console.log("Total size=>",size);
    let bytes = size;
    let mbs = files && files.length>0?(((bytes/1000)/1000)/files.length):0
    
    return(
        <div className="file_usage_card">
            <div className="file_icon">
                {type ==="Images" && <FcPicture/>}
                {type==="Pdfs" && <img src={pdficon} alt="pdf-icon"/>}
                {type==="Excel Sheets" && <img src={excel} alt="excel-icon"/>}
                {type==="Word Files" && <img src={word} alt="word-icon"/>}
            </div>
            <div className="file__usage__info">
                <div className="file_basic_info">
                <span>{type}</span>
                <p>{total_files} Files</p>
                </div>
                <span className="storage_data">{mbs.toFixed(2)} Mbs</span>
            </div>
        </div>
    )
}

function Dashboard(props) {

    const [isUploadTray,setTray]= React.useState(false);
    const [progress,setProgress] = React.useState(false);
    const [file,setFile] = React.useState(null);
    const [isFab,setFab] = React.useState(true);
    React.useEffect(()=>{
        props.setCurrentPage(props.type);
    })

    const history = useHistory()

    React.useEffect(()=>{
        if(!Cookies.get("AUTH_TOKEN")){
            history.push('/auth/login')
        }
    })


//https://fileehostt.herokuapp.com
    const uploadAtDatabase = async (name,url,upload_by,file_type,size)=>{
        console.log(name,url,upload_by);
        try{
          const r = await axios.post(`https://fileehostt.herokuapp.com/file/upload`,{
            name,
            url,
            upload_by,
            file_type,
            size
          }) ;
          
          return r.data;
        }
        catch(e){
            if(e.response && e.response.data){
                return e.response.data;
            }
        }
    }
    const handleUpload = (e)=>{
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        setFile(file);

        const {size,name,type} = file;

        //first check the type of file

        const allowedExtension = ["application/pdf","image/jpeg","image/jpg","image/png","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];


        if(!allowedExtension.includes(type)){
            return alert("Invalid File Type!");
        }

        //second check file

        if(size>4000000){
            return alert("File is too large!");
        }

        var storageRef = firebase.storage().ref();

        var fileRef = storageRef.child(`uploads/${name}`);

        const uploadTask = fileRef.put(file);

        uploadTask.on("state_changed",(snapshot)=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log('Upload is ' + progress + '% done');
            if(progress===100){
                setProgress(false);
            }
            else{
                setProgress(Math.floor(progress));
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);


              uploadAtDatabase(name,downloadURL,props.user?props.user.id:"Anonymous",type,size).then((data)=>{
                  if(data){
                    Notify("File successully added")
                  }
                const {record} = data;

                props.addFile(record);

                
              });

            });
          })




    }


  
    React.useEffect(()=>{
        const getPrivateFile = async ()=>{
            try{
                const r = await axios.get(`https://fileehostt.herokuapp.com/file/list/${props.user.id}`);
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }


        const getTrash = async ()=>{
            try{
                const r = await axios.get(`https://fileehostt.herokuapp.com/file/list/trash/${props.user && props.user.id}`);
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }

        getPrivateFile().then((files)=>{
            console.log(files);
            props.setMyFiles(files)
        
        })

        getTrash().then((trash)=>{
            console.log("trash",trash);
            props.setTrash(trash);
        })
    }
    
    ,
    // eslint-disable-next-line
    [props.user])




    const handleScroll = (e)=>{
        console.log(e.target.scrollTop);
        if(e.target.scrollTop>200){
            setFab(false);
        }
        else{
            setFab(true)
        }
    }


    const handleEditForm =()=>{
        
        props.setEditForm(true)

    }


   
    return (
        <div className="dashboard">
            {props.form_edit && <UserProfileUpdate/>}
            <MobileNav/>
           <Overlay/>
           <Sidebar/>
            <div className="main_dashboard" onScroll={handleScroll}>
                <div className="main__dashboard_wrapper">
                    <div className="dashboard__header">
                        <div className="header__left">
                        <h1>{props.current_page==="drive" && "My "}{props.current_page.charAt(0).toUpperCase()+props.current_page.slice(1)}</h1>
                        <p>👋  <span>Hello {props.user && props.user.name},Welcome</span></p>
                        </div>
                        <div className="header__mobile">
                            <button onClick={()=>props.setMobileNav(!props.mobile_nav)}><FiMenu/></button>
                        </div>
                    </div>

                    {/* <div className="file__header">
                        <span>Favourites</span>
                    </div> */}

                    <div className={`${props.current_page==="drive" &&  props.myfiles && props.myfiles.length>0 && "favorite__files"} ${props.current_page==="drive" && props.myfiles && props.myfiles.length===0 && "favorite__files__empty"}`}>
                        {/* <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/> */}

                        {
                            props.current_page==="drive" && props.myfiles && props.myfiles.map((file)=>{
                                console.log(file)
                                return <FileCard type={file.file_type.includes("image")?"file":"document"} kind="Images" name={file.file_name} id={file._id} addTrash={props.addTrash} inTrash={file.inTrash} trash={props.trash} myfiles={props.myfiles}/>
                            })
                        }

                        {
                           props.current_page==="drive" && props.myfiles && props.myfiles.length===0 && <div className="empty__desk">

                           <div className="empty__content">
                           <img src={character} alt="blank_content"/>
                           </div>
                       </div>
                        }


                       



                    </div>


                    <div className={`${props.current_page==="trash" && props.trash && props.trash.length>0 && "favorite__files"} ${props.current_page==="trash" && props.trash && props.trash.length===0 && "favorite__files__empty"}`}>
                        

                       



                        {
                            props.current_page==="trash" && props.trash && props.trash.map((file)=>{
                                console.log(file)
                                return <FileCard type={file.file_type.includes("image")?"file":"document"} kind="Images" name={file.file_name} id={file._id} inTrash={file.inTrash} restoreTrash={props.restoreTrash} trash={props.trash} myfiles={props.myfiles}/>
                            })
                        }


{
                           props.current_page==="trash" && props.trash && props.trash.length===0 && <div className="empty__desk">

                           <div className="empty__content">
                           <img src={empty} alt="blank_content"/>
                           </div>
                       </div>
                        }
                    </div>
                </div>
            </div>

            <div className="aside">
                <div className="aside__header">
                    <button className="notification_btn">
                                <FiBell/>
                    </button>
                    <div className="user__avatar" onClick={handleEditForm}>
                        {props.user && !props.user.avatar && props.user.name.charAt(0)+props.user.name.charAt(1)}
                        {props.user && props.user.avatar && <img src={props.user.avatar} alt="user__avatar"/>}
                    </div>
                </div>
                <div className="user__storage__usage">
                            <FileUsageCard type="Images" total_files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("image")).length} files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("image"))}/>
                            <FileUsageCard type="Pdfs" total_files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("pdf")).length} files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("pdf"))}/>
                            <FileUsageCard type="Word Files" total_files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("wordprocessing")).length} files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("wordprocessing"))}/>
                            <FileUsageCard type="Excel Sheets" total_files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("spreadsheetml")).length} files={props.myfiles && props.myfiles.filter((file)=>file.file_type.includes("spreadsheet"))}/>
                           
                         
                </div>

                {progress>0 && <div className="file_upload_progress__container">
                        <UploadFile filename={file && file.name} progress={progress && progress} setProgress={setProgress}/>
                        
                        
                </div>}


            </div>


            <label  htmlFor="file" className={`file_upload_btn ${!isFab && "fab_disable" }`} onClick={()=>setTray(!isUploadTray)}>
                <FiUpload/>
                <input type="file" name="file" id="file" onChange={handleUpload}/>
                
                
            </label>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user,
    public_files:state.appReducer.public_files,
    current_page:state.appReducer.current_page,
    myfiles:state.appReducer.myfiles,
    mobile_nav:state.appReducer.mobile_nav,
    form_edit:state.appReducer.form_edit,
    trash:state.appReducer.trash

})

const mapDispatchToProps = (dispatch)=>({
    setPublicFiles:(public_files)=>dispatch(setPublicFiles(public_files)),
    addFile:(file)=>dispatch(addFile(file)),
    setCurrentPage:(current_page)=>dispatch(setCurrentPage(current_page)),
    setFavourites:(favourites)=>dispatch(setFavourites(favourites)),
    setMyFiles:(files)=>dispatch(setMyFiles(files)),
    setMobileNav:(mobile_nav)=>dispatch(setMobileNav(mobile_nav)),
    setTrash:(trash)=>dispatch(setTrash(trash)),
    addTrash:(id)=>dispatch(addTrash(id)),
    restoreTrash:(id)=>dispatch(restoreTrash(id)),
    setEditForm:(form_edit)=>dispatch(setEditForm(form_edit)),
})
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
