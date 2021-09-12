import React from 'react'
import {FiEdit2} from "react-icons/fi"
import { connect } from 'react-redux'
import { setEditForm, setUser } from '../redux/actions/_appAction'
import "./Update.css"
import firebase from "firebase"
import axios from 'axios'


function Field({type,id,name,label,value,setValue}){
    return(
        <div className="custom_field">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} autoComplete="off" value={value} onChange={(e)=>setValue(e.target.value)}/>        
        </div>
    )
}
function UserProfileUpdate(props) {
    const [image,setImage] = React.useState(null);
    const [email,setEmail] = React.useState(props.user && props.user.email)
    const [name,setName] = React.useState(props.user && props.user.name)
    const [fieldImage,setFieldImage] = React.useState(null);
    const handleClose = (e)=>{
            const target = e.target;
            console.log(target)
            if(target.classList.contains("user_profile_form")){
                props.setEditForm(false);
            }
    }


   


    const uploadToFirebase = (name,file)=>{
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child(`avatars/${name}`);

        const uploadTask = fileRef.put(file);

        uploadTask.on("state_changed",(snapshot)=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log('Upload is ' + progress + '% done');
           
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

              setFieldImage(downloadURL);


              
            });
          })



    }



    const handleImage = (e)=>{
        const file = e.target.files[0]
        const {size} = file;
        const {name} = file;
        if(size>2000000){
            return alert("Large file!");
        }

        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            console.log(reader.result)
            setImage(reader.result)
            
          }, false);

          if (file) {
            reader.readAsDataURL(file);
          }

          uploadToFirebase(name,file)








    }


    console.log("Cuurent user avatar",image);


    const handleUpdate = ()=>{
        axios.put(`https://fileehostt.herokuapp.com/auth/edit`,{
            id:props.user.id,
            name,
            email,
            avatar:fieldImage?fieldImage:props.user.avatar

        }).then((response)=>{
            console.log(response);
            const {user} = response.data;
            props.setUser(user);
            props.setEditForm(false);
            setFieldImage(null)
            setImage(null)
        }).catch((e)=>{
            console.log(e);
        })
    }
    return (
        <div className="user_profile_form" onClick={handleClose}>
            <div className="user_profile_wrapper">
                <div className="modal__header">
                    <span>Edit Profile</span>
                  
                </div>

                <div className="modal_body">
                    <div className="uavatar">
                    <div className="modal__user__avatar" style={{'backgroundImage':`url(${image})`}}>

                       { !image && props.user.avatar && <img src={props.user.avatar} alt="user__picture" />}
                            <label htmlFor="avatar" className="user__avatar__edit_btn">
                                <FiEdit2/>
                                <input type="file" name="avatar" id="avatar" accept="image/jpeg" onChange={handleImage}/>
                            </label>
                    </div>
                    </div>

                    <div className="user__details">
                    <h3>{name}</h3>
                    <span className="user_email">{props.user && props.user.email}</span>
                    </div>


                    <div className="user_edit_form">
                        <Field type="email" name="email" id="email" label="Email address" value={email} setValue={setEmail}/>
                        <Field type="text" name="uname" id="uname" label="Username" value={name} setValue={setName}/>
                        <button className={`save_profile`} onClick={handleUpdate}>Update Details</button>
                    </div>

                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user
})

const mapDispatchToProps = (dispatch)=>({
    setEditForm:(form_edit)=>dispatch(setEditForm(form_edit)),
    setUser:(user)=>dispatch(setUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserProfileUpdate)
