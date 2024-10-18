import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard(){

    const[display,setDisplay] = useState('')
    const[displayUpdateForm,setDisplayUpdateForm] = useState(false)
    const[updateUserData,setUpdateUserData]=useState({
        name: '',
        password: ''
    })
    
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
    setDisplayUpdateForm(true)
}

function handleUpdateInputChange(e){
    setUpdateUserData({
        ...updateUserData,
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
            'Authorization': `Bearer ${token}`
        }
    }
)
    }catch(error){
        console.log(error)
    }}
 }


    return (
        <>
            <h2>Welcome to your dashboard page: <span>{display}</span>  </h2>

            <div>
                <button type="button" onClick = {handleUpdateButton} >Update User Info</button>
                <button type="button">Delete Account</button>
            </div>

            {displayUpdateForm &&(
                <>
                <div>
                <p>Note: If you submit a different email/password than the one you're using before, they will be updated in the database. If you want to change only your email, for example, submit your new email address and your current password. The same goes for a password-only change.
                </p>
                </div>
                <form onSubmit={handleUpdateSubmit}>
                    <label htmlFor="email">Type your current email/new email</label>
                    <input type="email" id="email" name="email" value={updateUserData.email} required onChange={handleUpdateInputChange}/>
                    <label htmlFor="password">Type your current password/new password</label>
                    <input type="password" id="password" name="password" value={updateUserData.password} required onChange={handleUpdateInputChange}/>
                    <button type="submit">Submit Change</button>
                </form>
                </>
            )}
        </>
    )
}