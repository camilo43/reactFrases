import { React, useEffect } from "react"
import { getUserInput } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"
import { getUserAuthenticated } from "../axios/postAxios.js"

function Auth () {
    const navigate = useNavigate()
    
    setTimeout(() => {        
        getUserAuthenticated()
        navigate("/auth/autenticado")
    }, 5000);
    
    return(
        <div className="mainBox">
            <div className="mainBox_header">
                <h1>We are authenticating your account</h1>
                <h3>Please wait</h3>
            </div>
        </div>
    )
}

export{ Auth }