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
            <div className='font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl '>
                <nav className='flex flex-row-reverse justify-items-end mr-2'>
                    <button className="  bg-red-600 text-xs rounded-full py-0.5 px-2 text-black font-bold border-red-500 border-solid border-2 -mt-1.5  hover:bg-red-900 focus:outline-none ring-2 ring-red-500" onClick={handleAdminLogout}>Logout</button>
                </nav>
                <h2 className='text-green-400 p-2 -mt-2'>
                    Welcome to the Admin Page
                </h2>
                <p className='text-amber-400 mb-3'>
                    Users List:
                </p>
                <ul className='flex flex-col justify-center bg-emerald-50 p-2 rounded-2xl text-sm '>
                    {userlist.map((e)=>(
                        <li className='text-black flex justify-between items-center p-2' key={e._id}>
                            <h3><span className='text-blue-500'> - Username:</span > "{e.username}" ; <span className='text-blue-500' >Email:</span> "<span >{e.email}</span>"</h3>
                            <div className="flex items-center ml-2">
                            <button type="button" className=" bg-gray-700 text-xs rounded-md   px-1 text-white font-bold border-gray-700 border-solid border-2 -mt-1.5 hover:bg-black" onClick={ ()=>{
                                setGotEmail(e.email)
                                setGotUSer(e.username);
                                openDeleteDialog()} 
                            }>Delete</button>
                            <button type="button" className=" bg-gray-700 text-xs rounded-md ml-2  px-1 text-white font-bold border-gray-700 border-solid border-2 -mt-1.5 hover:bg-black" 
                            onClick={()=>{
                                setGotEmail(e.email)
                                setGotUSer(e.username);
                                openAdminDialog()} 
                            } 
                            >Admin</button>
                        </div>
                        </li>
                    ))}
                </ul>
                <dialog ref={dialogRefDelete} className="rounded-2xl w-1/4">
                <div className="p-5 flex flex-col text-sm relative">    
                <button type="button" onClick={closeDeleteDialog} className="rounded-full  absolute top-2.5 right-2 w-6 h-6 hover:bg-gray-300"><img className="w-full h-full" src="../assets/close.png" alt="Close Dialog" /></button>
                <p className="pt-7 pb-5">Are you sure you want to delete <span className="text-red-700">{gotUser}</span> ?</p>
                    <button type="button" onClick={()=>{
                        setDeletedUser({
                            deletedEmail: gotEmail
                        });
                        closeDeleteDialog()
                    }} className="bg-red-100  text-sm m-auto w-2/5 rounded-2xl p-1 hover:bg-red-200">Delete User</button>
                </div>
                </dialog>

                <dialog ref={dialogRefAdmin} className="rounded-2xl w-1/4">
                <div className="p-5 flex flex-col text-sm relative" >
                <button type="button" onClick={closeAdminDialog} className="rounded-full  absolute top-2.5 right-2 w-6 h-6 hover:bg-gray-300" ><img className="w-full h-full" src="../assets/close.png" alt="Close Dialog" /></button>
                    <p className="pt-7 pb-5">Are you sure you want to give <span className="text-red-700">{gotUser}</span> an admin role ?</p>
                    <button type="button" onClick={()=>{
                        setEmailObject({
                            fetchedEmail: gotEmail
                        });
                        closeAdminDialog()
                    }} className="bg-green-100  text-sm m-auto w-2/5 rounded-2xl p-1 hover:bg-green-200">Give Admin</button>
                </div>
                </dialog>
                
            </div>
        </div>
        </>
    )
}