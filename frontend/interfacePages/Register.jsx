import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Register(){

const [registeredUserData,setRegisteredUserData] = useState({
        username:"",
        email: "",
        password:""
})

const [confirmPassword,setConfirmPassword] = useState('')

const [statusMessage,setStatusMessage] = useState('')

const navigate = useNavigate()
const apiUrl = process.env.REACT_APP_API_URL

function handleConfirmPassword(e){
    setConfirmPassword(e.target.value)
}

function handleInputChange (e){
    setRegisteredUserData(
       {
                ...registeredUserData
            ,
            [e.target.name] : e.target.value
        }
    )
}

async function handleFormSubmit(e){
    e.preventDefault()

    if(registeredUserData.password !== confirmPassword){
        setStatusMessage('Passwords must be equal!')
    } else{
        try{
            const response = await axios.post(`${apiUrl}register`,registeredUserData)
            const token = response.data.token
            localStorage.setItem('token',JSON.stringify(token))
            navigate('/dashboard')
            
        } catch(error){
            if(error.response && error.response.status === 400){
                setStatusMessage('This email already belongs to an existing user!')
            } else if(error.response && error.response.status === 500){
                setStatusMessage('Server error')
            }
            
        }
    } 
}

    return(
        <>
        <div className='flex flex-col justify-center items-center min-h-screen bg-emerald-50'>
            <div className='font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl'>
                <div className="flex justify-center items-center -mt-5 mb-3">
                    <h2>Register yourself on the User Authentication System!</h2>
                    <img className='w-8 h-8' src="././assets/lock-img.png" alt="" />
                </div>
                <form className='flex flex-col '  onSubmit={handleFormSubmit} >
                    <div className='p-2'>
                    <label  htmlFor="newUser">Type your full name:</label>
                    <input className='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 ' type="text" id="newUser" name="username" value={registeredUserData.username} onChange={handleInputChange} required/>
                    </div>
                    <div className='p-2'>
                    <label htmlFor="newEmail">Type a valid e-mail address:</label>
                    <input className='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 ' type="email" id="newEmail" name="email" value={registeredUserData.email} onChange={handleInputChange} required/>
                    </div>
                    <div className='p-2'>
                    <label htmlFor="newPassword">Type your password:</label>
                    <input className='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 ' id="newPassword" name="password" type="password" value={registeredUserData.password} onChange={handleInputChange} required />
                    </div>
                    <div className='p-2'>
                    <label htmlFor="newPasswordauth">Confirm your password:</label>
                    <input className='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 ' type="password" name="newPasswordauth" value={confirmPassword} onChange={handleConfirmPassword} required />
                    </div>
                    <div className='p-5'>
                    <button className="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-full mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200" type="submit" id="registerButton">Sign Up!</button>
                    </div>
                </form>
                <div>
                    <span className="text-red-500 text-sm">{statusMessage}</span>
                </div>
            </div>
        </div>
        </>
    )
}