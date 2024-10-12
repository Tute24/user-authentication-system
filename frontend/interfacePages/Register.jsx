import { useState } from "react"
import axios from 'axios'

export default function Register(){

const [registeredUserData,setRegisteredUserData] = useState({
        email: "",
        password:""
})

const [confirmPassword,setConfirmPassword] = useState('')

const [statusMessage,setStatusMessage] = useState('')

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

function handleFormSubmit(e){
    e.preventDefault()

    if(registeredUserData.password !== confirmPassword){
        setStatusMessage('Passwords must be equal!')
    } else{
        try{
            axios.post('http://localhost:3000/register',registeredUserData)
            console.log('Cadastro feito com sucesso!')
        } catch(error){
            setStatusMessage('Cadastro não funcionou!')
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