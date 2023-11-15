import React, { useState } from 'react'
import { Login } from './Login.jsx'
import { useNavigate } from 'react-router-dom'

function MainPage () {

    const [itsVisible, setItsVisible] = useState("none")

    const navigate = useNavigate()
        
    const redirectLogin = () => {
        navigate("/login")
    }

    const changingVisibility = (control=true) => {
       console.log("HA ENTRADO A CHANGE VIS", control)
        if(control === true){
            setItsVisible("block")
        }else{
            setItsVisible("none")
        }
    }

    const redirectSignUp = () => {
        navigate("/signup")
    }

    return (
        <>
        <div className="whitePageLoader" style={{display:itsVisible}}/> 
         <header className="header">
            <button className="buttonTryFree fadeIn" onClick={redirectSignUp}>
                Try Free
            </button>
         </header>
         <div className="centerDiv fadeIn">
            <div className="loader" style={{display:itsVisible}}/> 
            <div className="divLogin">
                <h1>Create a quote and save it</h1>
                <Login loaderVisibility={changingVisibility} ></Login>
                <br></br>
            </div>
        </div>
        </>
    )
}
export { MainPage }
