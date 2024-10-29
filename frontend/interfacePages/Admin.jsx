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
        <div class='flex flex-col justify-center items-center min-h-screen bg-emerald-50'>
            <div class='font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl'>
                <h2 class='text-green-400 p-2 -mt-2'>
                    Welcome to the Admin Page
                </h2>
                <p class='text-amber-400 mb-3'>
                    Users List:
                </p>
                <ul class='flex flex-col justify-center bg-emerald-50 p-2 rounded-2xl'>
                    {userlist.map((e)=>(
                        <li class='text-black' key={e._id}>
                            <h3><span class='text-blue-500'> - Username:</span > "{e.username}" ; <span class='text-blue-500' >Email:</span> "{e.email}"</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}