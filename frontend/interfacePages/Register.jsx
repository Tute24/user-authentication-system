import { useState } from "react"

export default function Register(){

    const [registeredUserData,setRegisteredUserData] = useState({
        email: "",
        password:""
    })
    return(
        <>
        <label htmlFor="newemail">Type a valid e-mail address:</label>
        <input type="email" id="newemail" name="email"/>
        <label htmlFor="newpassword">Type your password</label>
        <input id="newpassword" name="password" type="password" />
        <label htmlFor="newpasswordauth">Confirm your password:</label>
        <input type="password" name="newpasswordauth" />
        <button type="submit" id="registerButton">Sign Up!</button>
        </>
    )
}