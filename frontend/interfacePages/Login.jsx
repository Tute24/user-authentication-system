import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login(){
   
const [loginUserData,setloginUserData] = useState({
        email: "",
        password:""
})

const [statusMessage,setStatusMessage] = useState('')

function handleLoginInputChange(e){
    setloginUserData({
        ...loginUserData,
        [e.target.name]: e.target.value
    })
}

function handleLoginSubmit(e){
    e.preventDefault()

    try{
        axios.post('http://localhost:3000/login',loginUserData)
    } catch (error){
        setStatusMessage(`There's something wrong with your request!`)
    }
}

    return(
        <>
        <div>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Your E-mail: </label>
                <input type="email" id="email" name="email" value={loginUserData.email} placeholder="Log in with your e-mail" onChange={handleLoginInputChange}/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={loginUserData.password} placeholder="Type your password" onChange={handleLoginInputChange}/>
                <button type="submit" id="loginButton" >Log In</button>
            </form>
        <div>
            <span>{statusMessage}</span>
        </div>
        </div>
        <div>
            <span>
                Are you a new user? <Link to = "/register">Sign up now!</Link>
            </span>
        </div>
        </>
    )
}