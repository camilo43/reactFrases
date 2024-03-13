import { React, useEffect } from "react"
import { getUserInput } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"
import { getUserAuthenticated } from "../axios/postAxios.js"
import { Signup } from "./Signup.jsx"

function Auth () {
    const navigate = useNavigate()
    
    setTimeout(async () => {        
        await getUserAuthenticated()
        const users = await getUserAuthenticated()
        await getUserInput(users)
        navigate("/auth/authenticated")
    }, 5000);
    
    return(
        <>
            <header>
            </header>
            <div className="centerDiv fadeIn">
                <div>
                    <h1>We are authenticating your account</h1>
                    <h3>Please wait</h3>
                </div>
            </div>
        </>
      
    )
}

export{ Auth }