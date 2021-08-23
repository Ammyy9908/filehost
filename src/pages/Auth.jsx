import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'


function Field(props){
    return(
        <div className="field">
                        
                        <input type={props.type} name="" id={props.id} value={props.value} onChange={(e)=>props.setValue(e.target.value)}/>
                        <label htmlFor={props.id} className={props.value.length>0 && "static_label"}>{props.label}</label>
        </div>
    )
}

function Auth(props) {
    
    const [email,setEmail] = React.useState('');
    const [name,setName] = React.useState('');
    const [password,setPassword] = React.useState('');



    const handleAuth = ()=>{
        const url = `https://filehostt.herokuapp.com/auth/${props.type}`;

        axios.post(url,{email,name,password}).then((response)=>{
            console.log(response);
            const token = response.data;
            Cookies.set('AUTH_TOKEN',token);
            setTimeout(()=>{
                window.location.href="/";
            },3000);


        }).catch((e)=>{
            if(e.response && e.response.data){
                console.log(e.response.data)
            }
        })
    }



    return (
        <div className="auth">
            <div className="authBox">
                <h1>{props.type.charAt(0).toUpperCase()+props.type.slice(1)}</h1>
                <div className="auth__form">
                    <Field label="Email" type="email" id="email" value={email} setValue={setEmail}/>
                    {props.type==="register" && <Field label="Name" type="text" id="name" value={name} setValue={setName}/>}
                    <Field label="Password" type="password" id="password" value={password} setValue={setPassword}/>

                    <button className="submit_btn" onClick={handleAuth}>{props.type.charAt(0).toUpperCase()+props.type.slice(1)}</button>
                    <a href={`/auth/${props.type==="register"?"login":"register"}`}>{props.type==="login"?"Not have an account yet? Register":"Already have an account? Login"} </a>
                    
                </div>
            </div>
        </div>
    )
}

export default Auth
