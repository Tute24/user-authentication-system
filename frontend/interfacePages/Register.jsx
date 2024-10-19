import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export default function Register(){

const [registeredUserData,setRegisteredUserData] = useState({
        email: "",
        password:""
})

const [confirmPassword,setConfirmPassword] = useState('')

const [statusMessage,setStatusMessage] = useState('')

const navigate = useNavigate()

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
            const response = await axios.post('http://localhost:3000/register',registeredUserData)
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
            <form onSubmit={handleFormSubmit} >
                <label htmlFor="newemail">Type a valid e-mail address:</label>
                <input type="email" id="newemail" name="email" value={registeredUserData.email} onChange={handleInputChange}/>
                <label htmlFor="newpassword">Type your password</label>
                <input id="newpassword" name="password" type="password" value={registeredUserData.password} onChange={handleInputChange} />
                <label htmlFor="newpasswordauth">Confirm your password:</label>
                <input type="password" name="newpasswordauth" value={confirmPassword} onChange={handleConfirmPassword} />
                <button type="submit" id="registerButton">Sign Up!</button>
            </form>
            <div>
                <span>{statusMessage}</span>
            </div>
        </>
    )
}