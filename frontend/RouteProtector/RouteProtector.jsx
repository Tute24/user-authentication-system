import { Navigate } from "react-router-dom"

export default  function RouteProtector({children}){
    const token = localStorage.getItem("token")
    if(!token){
        return(
            <Navigate to="/"/>
        )
    } else{
        return children
    }
}