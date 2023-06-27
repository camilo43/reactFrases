import React from 'react'
import { Login } from './Login.jsx'
import { useNavigate } from 'react-router-dom'

function MainPage () {
    const navigate = useNavigate()
    
    const redirectLogin = () => {
        navigate("/login")
    }

    const redirectSignUp = () => {
        navigate("/signup")
    }

    return (
        <div>
            <h1>Create a quote and make it popular</h1>
            <p>Sign up to become a member of our community</p>
            <button onClick={redirectLogin}>Login</button>
            <button onClick={redirectSignUp}>SignUp</button>
        </div>
    )
}
export { MainPage }
