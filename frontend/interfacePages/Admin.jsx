import axios from "axios";
import { useEffect, useState } from "react";


export default function Admin (){
    const [statusMessage,setStatusMessage] = useState('')
    const [userlist, setUserList] = useState([])

    useEffect(()=>{
        async function fecthDB(){
            const token = JSON.parse(localStorage.getItem('token'))

    if(!token){
        setStatusMessage('Access Denied!')
    }

    try{
        const response = await axios.get('http://localhost:3000/admin',{headers:{
            'Authorization': `Bearer: ${token}`
        }})
        const todisp = (response.data.user)
        setUserList(todisp)

    }catch(error){
        console.log(error)
    }
}
    fecthDB()
    },[]) 

    return(
        <>
        <div>
            <h2>
                Admin Page
            </h2>
            <ul>
                {userlist.map((e)=>(
                    <li key={e._id}>
                        <h3>Username: {e.username} ; Email: {e.email}</h3>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}