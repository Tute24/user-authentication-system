import { Link } from "react-router-dom";

export default function Login(){
    return(
        <>
        <div>
            <label htmlFor="email">Your E-mail: </label>
            <input type="email" id="email" name="user_email" placeholder="Log in with your e-mail"/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="user_password" placeholder="Type your password"/>
            <button type="submit" id="loginButton">Log In</button>
        </div>
        <div>
            <span>
                Are you a new user? <Link to = "/Register">Sign up now!</Link>
            </span>
        </div>
        </>
    )
}