import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard(){

    const[display,setDisplay] = useState('')
    
    useEffect(()=>{

    async function fetchUserData(){
        const token = JSON.parse(localStorage.getItem("token")) 
        // Catch the token from the localStorage that's been sent by the login

        if(token){
            try{
            const getResponse = await axios.get('http://localhost:3000/dashboard',{headers:{
                'Authorization': `Bearer ${token}`
                // For the isAuthenticated middleware to check the requisition, that token has to be passed on the req's headers
            }})
            const userData = getResponse.data.user
                setDisplay(userData.email)  
        }catch(error){
            console.error("Error fetching data")
            setDisplay('Error')
        }
                 
        
    }

}  

    fetchUserData()
    },[]
)




    return (
        <>
            <h1>Welcome to your dashboard page: {display}  </h1>
        </>
    )
}