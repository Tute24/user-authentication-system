import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function Dashboard(){

    const[statusMessage,setStatusMessage] = useState('')
    const[display,setDisplay] = useState('')
    const[displayUpdateForm,setDisplayUpdateForm] = useState(false)
    const[displayDeleteForm,setDisplayDeleteForm] = useState(false)
    const[updateUserData,setUpdateUserData]=useState({
        submittedEmail: '',
        submittedPassword: ''
    })
    const[deleteUserData,setDeleteUserData]=useState({
        deletedEmail: '',
        deletedPassword: ''
    })
    
    const navigate = useNavigate()

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
                setDisplay(userData.username)  
        }catch(error){
            console.error("Error fetching data")
            setDisplay('Error')
        }   
    }
}  
    fetchUserData()
    },[]
)

 function handleUpdateButton(){

    setUpdateUserData({
        submittedEmail: '',
        submittedPassword: ''
        })
    
    setDeleteUserData({
        deletedEmail: '',
        deletedPassword: ''
    })

    setStatusMessage('')
    
    if(displayUpdateForm){
        setDisplayUpdateForm(false)
        
    } else{
        setDisplayUpdateForm(true)
        setDisplayDeleteForm(false)
        
    }
}

function handleDeleteButton(){

    setUpdateUserData({
        submittedEmail: '',
        submittedPassword: ''
    }
)

    setDeleteUserData({
        deletedEmail: '',
        eletedPassword: ''
    }
)

    setStatusMessage('')

    if(displayDeleteForm){
        setDisplayDeleteForm(false)
        
        setUpdateUserData()
    } else{
        setDisplayDeleteForm(true)
        setDisplayUpdateForm(false)  
    }
}

function handleUpdateInputChange(e){
    setUpdateUserData({
        ...updateUserData,
        [e.target.name]: e.target.value
    })
}

function handleDeleteInputChange(e){
    setDeleteUserData({
        ...deleteUserData,
        [e.target.name]: e.target.value
    })
}

 async function handleUpdateSubmit(e){
    e.preventDefault()

    const token = JSON.parse(localStorage.getItem("token"))

    if(token){
    try{
        const response = await axios.post('http://localhost:3000/update',updateUserData, {headers:
            {
                'Authorization':`Bearer ${token}`
            }
        }
    )
        const newToken = response.data.token
        setDisplay(response.data.updatedUser.email)
        localStorage.setItem('token',JSON.stringify(newToken))
        setDisplayUpdateForm(false)
}
    catch(error){
        setStatusMessage('Could not update your infos. Check your credentials and try again.')
    }}
 }

 async function handleDeleteSubmit(e){

        e.preventDefault()
    
        const token = JSON.parse(localStorage.getItem('token'))

        if(token){
            try{
                const response = await axios.post('http://localhost:3000/delete',deleteUserData,{headers:{
                    'Authorization': `Bearer ${token}`
                }})
                if(response.status === 200){
                    navigate('/')
                }
            }
            catch(error){
                setStatusMessage('Could not delete your account. Check your credentials and try again.')
            }
        }
 }

 async function handleLogout(){
    const token = JSON.parse(localStorage.getItem('token'))

    if(token){
        try{
            const logout = await axios.get('http://localhost:3000/logout',{headers:{
                'Authorization': `Bearer ${token}`
            }})
            if(logout.status === 200){
                localStorage.removeItem('token')
                navigate('/')
            }
            
        }
        catch(error){
            console.log(error)
        }
    }
 }


    return (
        <>
        <div class='flex flex-col justify-center items-center min-h-screen p-4 bg-emerald-50'>
            
            <div class='font-sans text-center bg-black text-white font-semibold rounded-2xl sm:w-3/5'>
                <nav class='flex flex-row-reverse justify-items-end mr-2' >
                    <button class="  bg-red-600 text-xs rounded-full py-0.5 px-2 text-black font-bold border-red-500 border-solid border-2  mt-1.5  hover:bg-red-900 focus:outline-none ring-2 ring-red-500" type="button" onClick={handleLogout}>Logout</button>
                </nav>
                <div class='p-6'>
                <h2 class='-mt-2'>Welcome to your dashboard page, <span class='text-green-400'>{display}!</span>  </h2>

                <div class= 'w-full flex justify-center gap-6 mt-5 mb-5'>
                    <button class="text-sm bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2  mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200" type="button" onClick = {handleUpdateButton} >Update User Info</button>
                    <button class="text-sm bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2  mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200" type="button" onClick={handleDeleteButton}>Delete Account</button>
                </div>

                {displayUpdateForm &&(
                    <>
                    <div>
                    <p class='break-normal text-xs text-amber-300 p-3'>Note: If you submit a different email/password than the one you're using before, they will be updated in the database. If you want to change only your email, for example, submit your new email address and your current password. The same goes for a password-only change.
                    </p>
                    </div>
                    <form class='flex flex-col ' onSubmit={handleUpdateSubmit}>
                    <div class='p-2'>
                        <label class='text-sm' htmlFor="email">Type your current email/new email:</label>
                        <input class='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-4/5 focus:outline-none ring-2 ring-amber-200 ' type="email" id="email" name="submittedEmail" value={updateUserData.submittedEmail} required onChange={handleUpdateInputChange}/>
                    </div>
                    <div class='p-2'>
                        <label class='text-sm' htmlFor="password">Type your current password/new password:</label>
                        <input class='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-4/5 focus:outline-none ring-2 ring-amber-200 ' type="password" id="password" name="submittedPassword" value={updateUserData.submittedPassword} required onChange={handleUpdateInputChange}/>
                    </div>
                    <div class='p-5'>
                        <button class="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-4/5 mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200" type="submit">Submit Change</button>
                    </div>
                    <div class="text-red-500 text-sm">
                        {statusMessage}
                    </div>
                    </form>
                    </>
                )}

                {displayDeleteForm &&(
                    <>
                    <div>
                        <p class='break-normal text-xs text-amber-300 p-3'>
                            Note: If you delete your account, you won't be able to recover it. 
                            Type your current email and password to confirm the action.
                        </p>
                        <form class='flex flex-col' onSubmit={handleDeleteSubmit}>
                        <div class='p-2 flex flex-col place-items-center'>
                            <label class='text-sm' htmlFor="deleteEmail">Type your account's email:</label>
                            <input class='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-4/5 focus:outline-none ring-2 ring-amber-200 '  type="email" required id="deleteEmail" name="deletedEmail" value={deleteUserData.deletedEmail} onChange={handleDeleteInputChange} />
                        </div>
                        <div class='p-2 flex flex-col place-items-center'>
                            <label class='text-sm' htmlFor="deletePassword">Type your password:</label>
                            <input class='mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-4/5 focus:outline-none ring-2 ring-amber-200 '  type="password" required id="deletePassword" name="deletedPassword" value={deleteUserData.deletedPassword} onChange={handleDeleteInputChange} />
                        </div>
                        <div class='p-5 '>
                            <button class="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-4/5 mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200" type="submit">Delete Account</button>
                        </div>
                        <div class="text-red-500 text-sm">
                            {statusMessage}
                        </div>
                        </form>
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
        </>
    )
}