import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Admin (){
    const [statusMessage,setStatusMessage] = useState('')
    const [userlist, setUserList] = useState([])
    const [emailObject,setEmailObject] = useState({
        fetchedEmail:''
    })
    const [deletedUser,setDeletedUser] = useState({
        deletedEmail: ''
    })

    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const emailRef = useRef(null)

    useEffect(()=>{
        async function fecthDB(){
            const token = JSON.parse(localStorage.getItem('token'))

    if(!token){
        setStatusMessage('Access Denied!')
    }

    try{
        const response = await axios.get(`${apiUrl}admin`,{headers:{
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

    useEffect(() => { 
        async function giveAdmin(){
        const token = JSON.parse(localStorage.getItem('token'))
    
        if(token){
            try{
                const response = await axios.post(`${apiUrl}giveAdmin`,emailObject,{headers:{
                    'Authorization': `Bearer: ${token}`
                }})
            }catch(error){
                console.log(error)
            }
        }}
        giveAdmin()
    }, [emailObject]);

    async function handleAdminLogout(){
        const token = JSON.parse(localStorage.getItem('token'))

        try{
            const response = await axios.get(`${apiUrl}adminlogout`,{headers:{
                'Authorization': `Bearer ${token}`
            }})
            localStorage.removeItem('token')
            navigate('/')
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        async function handleDeletedUser() {
            const token = JSON.parse(localStorage.getItem('token'))

            if(token){
                const response = await axios.post(`${apiUrl}deletedUser`,deletedUser,{headers:{
                    'Authorization': `Bearer ${token}`
                }})
            }
        }
        handleDeletedUser()
    }
    
    ,[deletedUser])

    return(
        <>
        <div className='flex flex-col justify-center items-center min-h-screen bg-emerald-50'>
            <div className='font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl'>
                <nav className='flex flex-row-reverse justify-items-end mr-2'>
                    <button className="  bg-red-600 text-xs rounded-full py-0.5 px-2 text-black font-bold border-red-500 border-solid border-2 -mt-1.5  hover:bg-red-900 focus:outline-none ring-2 ring-red-500" onClick={handleAdminLogout}>Logout</button>
                </nav>
                <h2 className='text-green-400 p-2 -mt-2'>
                    Welcome to the Admin Page
                </h2>
                <p className='text-amber-400 mb-3'>
                    Users List:
                </p>
                <ul className='flex flex-col justify-center bg-emerald-50 p-2 rounded-2xl text-sm'>
                    {userlist.map((e)=>(
                        <li className='text-black flex flex-row p-2' key={e._id}>
                            <h3><span className='text-blue-500'> - Username:</span > "{e.username}" ; <span className='text-blue-500' >Email:</span> "<span ref={emailRef}>{e.email}</span>"</h3>
                            <button type="button" class=" bg-red-600 text-xs rounded-full py-0.5 px-2 text-black font-bold border-red-500 border-solid border-2 -mt-1.5" onClick={async()=>{
                                const deletedUserEmail = e.email
                                setDeletedUser({
                                    deletedEmail: deletedUserEmail
                                })
                            }}>Delete User</button>
                            <button type="button" class=" bg-red-600 text-xs rounded-full py-0.5 px-2 text-black font-bold border-red-500 border-solid border-2 -mt-1.5" onClick={async()=>{

                                const correspondentEmail = e.email
                                 setEmailObject({
                                    fetchedEmail: correspondentEmail
                                }
                            )
                                
                            }}>Give Admin</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}