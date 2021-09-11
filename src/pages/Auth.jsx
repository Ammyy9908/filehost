import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import Alert from '../components/Alert';
import dotenv from "dotenv"
import { Link } from 'react-router-dom';
import {FiEye,FiEyeOff} from "react-icons/fi"
dotenv.config()

function Field(props){

  

    const [isPassword,setPassword] = React.useState(true);


    const handleToggle = (e)=>{
        const input = e.target.parentElement.children[0]
        if(isPassword){
            input.setAttribute('type','text')
            setPassword(false);
        }
        else{
            input.setAttribute('type','password')
        setPassword(true);
        }
    }

    
    return(
        <div className="field">
                         
                        <div className="field__control">
                        <input type={props.type} name="" id={props.id} value={props.value} onChange={(e)=>props.setValue(e.target.value)} autoComplete="off"/>
                        {props.name==="password1" && <button className="password_toggle" onClick={handleToggle}>{isPassword?<FiEyeOff/>:<FiEye/>}</button>}
                        </div>
                        <label htmlFor={props.id} className={props.value.length>0 && "static_label"}>{props.label}</label>
                       
        </div>
    )
}

function Auth(props) {
    
    const [email,setEmail] = React.useState('');
    const [name,setName] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [password2,setPassword2] = React.useState('')
    const [error,setError] = React.useState(false);



    React.useEffect(()=>{

        if(email || name || password || password2 || error){
            setEmail('')
            setPassword('')
            setPassword2('')
            setName('')
            setError(false)
        }

    },
    // eslint-disable-next-line
    [props.type])





    const handleAuth = ()=>{
        const url = `https://fileehostt.herokuapp.com/auth/${props.type}`;

        axios.post(url,{email,name,password}).then((response)=>{
            if(response.status===200){
                console.log(response);
            
            const token = response.data;
            token && Cookies.set('AUTH_TOKEN',token);
            console.log(token);
            setTimeout(()=>{
                window.location.href="/dashboard/drive";
            },3000);
            }
            else{
                console.log(response.data.message);
            }


        }).catch((e)=>{
            if(e.response && e.response.data){
                console.log(e.response.data)
                setError(e.response.data.message)
                setEmail('')
                setPassword('')
                setName('')
            }
        })
    }



    return (
        <div className="auth">
            <Alert error={error} setError={setError}/>
           <div className="auth_screen">
              

               <div className="auth_screen_content">
                   <h1> {props.type==="register"?"Sign Up":"Login"}</h1>
                   <p>{props.type==="login"?"Don't have an account?":"Already have account?"}<Link to={props.type==="register"?"/auth/login":"/auth/register"}> {props.type==="login"?"Register":"Login"}</Link>.</p>
                   <div className="auth_form">
                       <Field name="email" id="email" label="Email" type="email" value={email} setValue={setEmail}/>
                       {props.type==="register" && <Field name="name" id="name" label="Full Name" type="text" value={name} setValue={setName}/>}
                       <Field name="password1" id="password1" label="Password" type="password" value={password} setValue={setPassword}/>
                       {props.type==="register" && <Field name="password2" id="password2" label="Repeat Password" type="password" value={password2} setValue={setPassword2}/>}
                       <input type="button" value={props.type==="register"?"Signup":"Login"} onClick={handleAuth}/>
                   </div>
               </div>
           </div>
           <div className="auth_screen_right">
               
           </div>
        </div>
    )
}

export default Auth
