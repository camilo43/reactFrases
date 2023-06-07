import { React, useEffect } from "react"
import { getUserInput } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"
import { getUserAuthenticated } from "../axios/postAxios.js"

function Auth () {
    const navigate = useNavigate()
    // useEffect(() => {
    //     getUserInput()
    // }, []);
    
    setTimeout(() => {
        getUserAuthenticated()
        navigate("/auth/autenticado")
    }, 5000);
    
    console.log("PASSWORD CONFIRMED---> 4");

    return(
        <div>
           <h1>We are authenticating your account</h1>
           <h3>Please wait</h3>
        </div>
    )
}

export{ Auth }