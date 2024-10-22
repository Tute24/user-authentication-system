import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function Dashboard(){

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

 function handleUpdateButton(){
    if(displayUpdateForm){
        setDisplayUpdateForm(false)
    } else{
        setDisplayUpdateForm(true)
    }
}

function handleDeleteButton(){
    if(displayDeleteForm){
        setDisplayDeleteForm(false)
    } else{
        setDisplayDeleteForm(true)
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
        console.log(error)
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
                console.log(error)
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
            <nav >
                <button type="button" onClick={handleLogout}>Logout</button>
            </nav>
            <h2>Welcome to your dashboard page: <span>{display}</span>  </h2>

            <div>
                <button type="button" onClick = {handleUpdateButton} >Update User Info</button>
                <button type="button" onClick={handleDeleteButton}>Delete Account</button>
            </div>

            {displayUpdateForm &&(
                <>
                <div>
                <p>Note: If you submit a different email/password than the one you're using before, they will be updated in the database. If you want to change only your email, for example, submit your new email address and your current password. The same goes for a password-only change.
                </p>
                </div>
                <form onSubmit={handleUpdateSubmit}>
                    <label htmlFor="email">Type your current email/new email</label>
                    <input type="email" id="email" name="submittedEmail" value={updateUserData.submittedEmail} required onChange={handleUpdateInputChange}/>
                    <label htmlFor="password">Type your current password/new password</label>
                    <input type="password" id="password" name="submittedPassword" value={updateUserData.submittedPassword} required onChange={handleUpdateInputChange}/>
                    <button type="submit">Submit Change</button>
                </form>
                </>
            )}

            {displayDeleteForm &&(
                <>
                <div>
                    <p>
                        Note: If you delete your account, you won't be able to recover it. 
                        Type your current email and password to confirm the action.
                    </p>
                    <form onSubmit={handleDeleteSubmit}>
                        <label htmlFor="deleteEmail">Type your account's email</label>
                        <input type="email" required id="deleteEmail" name="deletedEmail" value={deleteUserData.deletedEmail} onChange={handleDeleteInputChange} />
                        <label htmlFor="deletePassword">Type your password</label>
                        <input type="password" required id="deletePassword" name="deletedPassword" value={deleteUserData.deletedPassword} onChange={handleDeleteInputChange} />
                        <button type="submit">Delete Account</button>
                    </form>
                </div>
                </>
            )}
        </>
    )
}