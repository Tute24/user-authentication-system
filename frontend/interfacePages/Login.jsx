import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
   
const [loginUserData,setloginUserData] = useState({
        email: "",
        password:"",
})

const navigate = useNavigate()

const [statusMessage,setStatusMessage] = useState('')

function handleLoginInputChange(e){
    setloginUserData({
        ...loginUserData,
        [e.target.name]: e.target.value
    })
}

async function handleLoginSubmit(e){
    e.preventDefault()

       const response = await axios.post('https://user-authentication-system-jb9x.onrender.com/login',loginUserData)
       const token = response.data.token
       if(!token){
        setStatusMessage("Email e/ou senha incorretos. Usuário não autorizado!")
       } else{
        localStorage.setItem("token",JSON.stringify(token))
        const user = response.data.user
        if(user.role === 'admin'){
            navigate('/admin')
        }else{
            navigate('/dashboard')
        }
       }  
    }


    return(
        <>
        <div className='flex flex-col justify-center items-center min-h-screen bg-emerald-50'>
        <div className='font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl' >
            <div className="flex justify-between items-center -mt-5 mb-3">
                <h2>Welcome to the User Authentication System!</h2>
                <img className='w-8 h-8' src="././assets/lock-img.png" alt="" />
            </div>
            <form onSubmit={handleLoginSubmit}>
                <div className='p-2'>
                    <label htmlFor="email">Your E-mail: </label>
                    <input className='border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 ' type="email" id="email" name="email" value={loginUserData.email} placeholder="Log in with your e-mail" onChange={handleLoginInputChange}/>
                </div>
                <div className='p-2'>
                    <label htmlFor="password">Password:</label>
                    <input className='border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200' type="password" id="password" name="password" value={loginUserData.password} placeholder="Type your password" onChange={handleLoginInputChange}/>
                </div>
                <div className='p-5 '>
                    <button className="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-full mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200" type="submit" id="loginButton" >Log In</button>
                </div>
            </form>
        <div>
            <span className="text-red-500 text-xs">{statusMessage}</span>
        </div>
        </div>
        <div className="text-center">
            <span className='font-semibold' >
                Are you a new user? <Link to = "/register"><span className='text-indigo-500  font-semibold hover:underline'>Sign up now!</span></Link>
            </span>
        </div>
        </div>
        </>
    )
}