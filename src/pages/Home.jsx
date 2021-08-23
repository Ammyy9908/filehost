import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import {FiUploadCloud,FiDownloadCloud} from "react-icons/fi"
import firebase from "firebase"
import axios from 'axios';
import { addFile, setPublicFiles } from '../redux/actions/_appAction';
// eslint-disable-next-line
import storage from '../config/firebase'
function FileCard({file}){
    return (
        <div className="file_card">
            <div className="file__cover">
               { file.file_type==="image/jpeg" || file.file_type==="image/jpg" || file.file_type==="image/png" ? <img src={file.url} alt="NOT AVAILABLE" />:null}
               {file.file_type==="application/pdf" && <img src="https://img.icons8.com/color/96/000000/pdf.png" alt="NOT AVAILABLE" />}
               {file.file_type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document" && <img src="https://img.icons8.com/color/96/000000/word.png" alt="NOT AVAILABLE"/>}
            </div>
            <div className="file__footer">
                <div className="file__type__icon"></div>
                <span className="file_name">{file.file_name.length>15?file.file_name.slice(0,15)+"...":file.file_name}</span>
                <button className="download_btn"><FiDownloadCloud/></button>
            </div>
        </div>
    )
}
function Home(props) {
    console.log(props)
    const [Progress,setProgress] = React.useState(0);


    const uploadAtDatabase = async (name,url,upload_by,file_type)=>{
        console.log(name,url,upload_by);
        try{
          const r = await axios.post('https://filehostt.herokuapp.com/file/upload',{
            name,
            url,
            upload_by,
            file_type
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

        const {size,name,type} = file;

        //first check the type of file

        const allowedExtension = ["application/pdf","image/jpeg","image/jpg","image/png","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];


        if(!allowedExtension.includes(type)){
            return alert("Invalid File Type!");
        }

        //second check file

        if(size>2000000){
            return alert("File is too large!");
        }

        var storageRef = firebase.storage().ref();

        var fileRef = storageRef.child(`uploads/${name}`);

        const uploadTask = fileRef.put(file);

        uploadTask.on("state_changed",(snapshot)=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log('Upload is ' + progress + '% done');
            setProgress(progress);
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


              uploadAtDatabase(name,downloadURL,props.user?props.user.name:"Anonymous",type).then((data)=>{
                const {record} = data;

                props.addFile(record);

                
              });

            });
          })




    }


    React.useEffect(()=>{
       
        const getPublicFiles = async ()=>{
            try{
                const r = await axios.get('https://filehostt.herokuapp.com/file/list');
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }


        



       getPublicFiles().then((files)=>{
           console.log(files);
           props.setPublicFiles(files);
       });

      

      
    },
    // eslint-disable-next-line
    []);

    React.useEffect(()=>{
        const getPrivateFile = async ()=>{
            try{
                const r = await axios.get('https://filehostt.herokuapp.com/file/list/private',{
                    params:{
                        upload_by:props.user.name
                    }
                });
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }

        props.user && getPrivateFile().then((files)=>{
            console.log(files);
        })
    },[props.user])
    return (
        <div>
            <Navbar/>
            {Progress!==100 && Progress>0 &&  <div className="progressbar">
                <div className="progress_value" style={{width:`${Progress}%`}}></div>
            </div>}

            <div className="public__files">
                <div className="container">
                <h1>Public Files</h1>
                <div className="files__container">
                    {
                        props.public_files && props.public_files.filter((file)=>file.upload_by==="Anonymous").map((file,i)=>{
                            return <FileCard file={file} key={i}/>
                        })
                    }
                </div>

                {props.user && <><h1>My Files</h1>
                <div className="files__container">
                    {
                        props.public_files && props.public_files.filter((file)=>file.upload_by===props.user.name).map((file,i)=>{
                            return <FileCard file={file} key={i}/>
                        })
                    }
                </div></>}

                
                </div>
            </div>
            <label htmlFor="file" id="upload_btn">
                <FiUploadCloud/>
                <input type="file" id="file" onChange={handleUpload}/>
            </label>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user,
    public_files:state.appReducer.public_files
})

const mapDispatchToProps = (dispatch)=>({
    setPublicFiles:(public_files)=>dispatch(setPublicFiles(public_files)),
    addFile:(file)=>dispatch(addFile(file))
})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
