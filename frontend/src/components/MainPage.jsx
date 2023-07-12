import React from 'react'
import { Login } from './Login.jsx'
import { useNavigate } from 'react-router-dom'

const styleSignUp = {
    
}

const stylesMainDiv = {
}


function MainPage () {
    const navigate = useNavigate()
    
    const redirectLogin = () => {
        navigate("/login")
    }

    const redirectSignUp = () => {
        navigate("/signup")
    }

    return (
        <div className="mainBox">
            <div className="mainBox_header">
                <h1>Create a quote and save it</h1>
                <br></br>
                <Login></Login>
                <br></br>
                <p>Not a member yet? <a style={styleSignUp} href={"#"} onClick={redirectSignUp}>SignUp</a> to become part of our community</p>
            </div>
        </div>
    )
}
export { MainPage }
