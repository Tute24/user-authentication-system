import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
   
const [loginUserData,setloginUserData] = useState({
        email: "",
        password:""
})

const navigate = useNavigate()

const [authenticatedRoute, setAuthenticatedRoute] = useState('')

const [statusMessage,setStatusMessage] = useState('')

function handleLoginInputChange(e){
    setloginUserData({
        ...loginUserData,
        [e.target.name]: e.target.value
    })
}

async function handleLoginSubmit(e){
    e.preventDefault()

       const response = await axios.post('http://localhost:3000/login',loginUserData)
       const token = response.data.token
       if(!token){
        setStatusMessage("Email e/ou senha incorretos. Usuário não autorizado!")
       } else{
        localStorage.setItem("token",JSON.stringify(token))
        navigate('/dashboard')
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