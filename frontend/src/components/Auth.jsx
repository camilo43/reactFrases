import { React, useEffect } from "react"
import { getUserInput } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"


function Auth () {
    useEffect(() => {
        getUserInput()
    }, []);
   
    console.log("PASSWORD CONFIRMED---> 4");

    return(
        <div>
           <h1>We are authenticating your account</h1>
           <h3>Please wait</h3>
        </div>
    )
}

export{ Auth }