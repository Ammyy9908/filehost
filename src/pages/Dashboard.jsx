import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import firebase from "firebase"
import axios from 'axios';
import { addFile, setCurrentPage, setFavourites, setMobileNav, setMyFiles, setPublicFiles } from '../redux/actions/_appAction';

import Sidebar from '../components/Sidebar'
// eslint-disable-next-line
import storage from '../config/firebase'
import "./Dashboard.css"
import {FiMoreHorizontal,FiStar,FiBell,FiMenu} from "react-icons/fi"
import {FcPicture,FcDocument} from "react-icons/fc"
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import UploadFile from '../components/UploadFile';
import MobileNav from '../components/MobileNav';
import Overlay from '../components/Overlay';


function FavouriteCard({type,kind}){

    

    const removeFromFavourite = (e)=>{
        console.log(e.target)
    }
    return <div className="favourite_card">
        <div className={`card__content ${type+"__card"}`}>
        <div className="card__header">
            <button onClick={removeFromFavourite}><FiStar/></button>
            <button><FiMoreHorizontal/></button>
        </div>
        <div className="card__thumb">
            {type==="file"?<FcPicture/>:<FcDocument/>}
        </div>
        </div>

        <div className="card__footer">
            <h3>All {kind.charAt(0).toUpperCase()+kind.slice(1)}</h3>
            <span>23 Aug 2020</span>
        </div>


    </div>
}

function FileUsageCard(){
    return(
        <div className="file_usage_card">
            <div className="file_icon">
                <FcPicture/>
            </div>
            <div className="file__usage__info">
                <div className="file_basic_info">
                <span>Images</span>
                <p>120 Files</p>
                </div>
                <span className="storage_data">12 GB</span>
            </div>
        </div>
    )
}

function Dashboard(props) {


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
    // const uploadAtDatabase = async (name,url,upload_by,file_type)=>{
    //     console.log(name,url,upload_by);
    //     try{
    //       const r = await axios.post(`http://localhost:5000/file/upload`,{
    //         name,
    //         url,
    //         upload_by,
    //         file_type
    //       }) ;
          
    //       return r.data;
    //     }
    //     catch(e){
    //         if(e.response && e.response.data){
    //             return e.response.data;
    //         }
    //     }
    // }
    // const handleUpload = (e)=>{
    //     console.log(e.target.files[0]);
    //     const file = e.target.files[0];

    //     const {size,name,type} = file;

    //     //first check the type of file

    //     const allowedExtension = ["application/pdf","image/jpeg","image/jpg","image/png","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];


    //     if(!allowedExtension.includes(type)){
    //         return alert("Invalid File Type!");
    //     }

    //     //second check file

    //     if(size>2000000){
    //         return alert("File is too large!");
    //     }

    //     var storageRef = firebase.storage().ref();

    //     var fileRef = storageRef.child(`uploads/${name}`);

    //     const uploadTask = fileRef.put(file);

    //     uploadTask.on("state_changed",(snapshot)=>{
    //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    //         console.log('Upload is ' + progress + '% done');
    //         // setProgress(progress);
    //     },
    //     (error) => {
    //         // Handle unsuccessful uploads
    //         console.error(error)
    //       },
    //       () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //           console.log('File available at', downloadURL);


    //           uploadAtDatabase(name,downloadURL,props.user?props.user.name:"Anonymous",type).then((data)=>{
    //             const {record} = data;

    //             props.addFile(record);

                
    //           });

    //         });
    //       })




    // }


    React.useEffect(()=>{
       
        const getFiles = async ()=>{
            try{
                const r = await axios.get(`https://fileehostt.herokuapp.com/file/list`);
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }


        



       getFiles().then((files)=>{
           console.log(files);
        const private_files = files.filter((file)=>file.upload_by===props.user && props.user.name)
        props.setMyFiles(private_files)
       });

      

      
    },
    // eslint-disable-next-line
    []);

    // React.useEffect(()=>{
    //     const getPrivateFile = async ()=>{
    //         try{
    //             const r = await axios.get(`http://localhost:5000/file/list/private`,{
    //                 params:{
    //                     upload_by:props.user.name
    //                 }
    //             });
    //             return r.data;
    //         }
    //         catch(e){
    //             if(e.response && e.response.data){
    //                 return e.response.data;
    //             }
    //         }
    //     }

    //     props.user && getPrivateFile().then((files)=>{
    //         console.log(files);
    //         props.setMyFiles(files)
    //     })
    // },[props.user])


   
    return (
        <div className="dashboard">
            <MobileNav/>
           <Overlay/>
           <Sidebar/>
            <div className="main_dashboard">
                <div className="main__dashboard_wrapper">
                    <div className="dashboard__header">
                        <div className="header__left">
                        <h1>My Cloud</h1>
                        <p>👋  <span>Hello {props.user && props.user.name},Welcome</span></p>
                        </div>
                        <div className="header__mobile">
                            <button onClick={()=>props.setMobileNav(!props.mobile_nav)}><FiMenu/></button>
                        </div>
                    </div>

                    <div className="file__header">
                        <span>Favourites</span>
                    </div>

                    <div className="favorite__files">
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
                        <FavouriteCard type="file" kind="Images"/>
{/* 
                        {
                            props.myfiles && props.myfiles.map((file)=>{
                                console.log(file)
                                return <FavouriteCard type={file.file_type.includes("image")?"file":"document"} kind="Images"/>
                            })
                        } */}
                    </div>
                </div>
            </div>

            <div className="aside">
                <div className="aside__header">
                    <button className="notification_btn">
                                <FiBell/>
                    </button>
                    <div className="user__avatar">
                        {props.user && props.user.name.charAt(0)+props.user.name.charAt(1)}
                    </div>
                </div>
                <div className="user__storage__usage">
                            <FileUsageCard/>
                            <FileUsageCard/>
                            <FileUsageCard/>
                            <FileUsageCard/>
                            <FileUsageCard/>
                            <FileUsageCard/>
                </div>

                <div className="file_upload_progress__container">
                        <UploadFile/>
                        
                        
                </div>


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
    setPublicFiles:(public_files)=>dispatch(setPublicFiles(public_files)),
    addFile:(file)=>dispatch(addFile(file)),
    setCurrentPage:(current_page)=>dispatch(setCurrentPage(current_page)),
    setFavourites:(favourites)=>dispatch(setFavourites(favourites)),
    setMyFiles:(files)=>dispatch(setMyFiles(files)),
    setMobileNav:(mobile_nav)=>dispatch(setMobileNav(mobile_nav))
})
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
