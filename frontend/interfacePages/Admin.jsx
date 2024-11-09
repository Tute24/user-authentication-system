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
    const [gotEmail,setGotEmail] = useState('')
    const [gotUser, setGotUSer] = useState('')

    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const dialogRefAdmin = useRef(null)
    const dialogRefDelete = useRef(null)

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

    function openAdminDialog(){
        dialogRefAdmin.current.showModal()
    }

    function closeAdminDialog(){
        dialogRefAdmin.current.close()
    }

    function openDeleteDialog(){
        dialogRefDelete.current.showModal()
    }

    function closeDeleteDialog(){
        dialogRefDelete.current.close()
    }

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
    }, [emailObject])

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
                            <h3><span className='text-blue-500'> - Username:</span > "{e.username}" ; <span className='text-blue-500' >Email:</span> "<span >{e.email}</span>"</h3>
                            <button type="button" class=" bg-red-600 text-xs rounded-full py-0.5 px-2 text-black font-bold border-red-500 border-solid border-2 -mt-1.5" onClick={ ()=>{
                                setGotEmail(e.email)
                                setGotUSer(e.username);
                                openDeleteDialog()} 
                            }>Delete</button>
                            <button type="button" class=" bg-red-600 text-xs rounded-full py-0.5 px-2 text-black font-bold border-red-500 border-solid border-2 -mt-1.5" 
                            onClick={()=>{
                                setGotEmail(e.email)
                                setGotUSer(e.username);
                                openAdminDialog()} 
                            } 
                            >Admin</button>
                        </li>
                    ))}
                </ul>
                <dialog ref={dialogRefDelete}>    
                <button type="button" onClick={closeDeleteDialog} className="bg-cyan-500">Close</button>
                <p>Are you sure you want to delete <span className="text-red-700">{gotUser}</span> ?</p>
                    <button type="button" onClick={()=>{
                        setDeletedUser({
                            deletedEmail: gotEmail
                        });
                        closeDeleteDialog()
                    }}>Delete User</button>
                </dialog>

                <dialog ref={dialogRefAdmin}>
                <div className="p-5">
                <button type="button" onClick={closeAdminDialog} className="bg-cyan-500">Close</button>
                    <p>Are you sure you want to give <span className="text-red-700">{gotUser}</span> an admin role ?</p>
                    <button type="button" onClick={()=>{
                        setEmailObject({
                            fetchedEmail: gotEmail
                        });
                        closeAdminDialog()
                    }}>Give Admin</button>
                </div>
                </dialog>
                
            </div>
        </div>
        </>
    )
}