import React, { useState, useEffect } from 'react'
import { Login } from './Login.jsx'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../Module.jsx'
import { Signup } from './Signup.jsx'

function MainPage () {

    const [itsVisible, setItsVisible] = useState("none")
    const [openModal, setOpenModal] = useState(true)

    const navigate = useNavigate()
        
    const redirectLogin = () => {
        navigate("/login")
    }
    
    const changingVisibility = (control=true) => {
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
                    <h1 className="mainTitle">Create a quote and save it</h1>
                    <Login loaderVisibility={changingVisibility} ></Login>
                    <br></br>
                </div>
            </div>
        </>
    )
}
export { MainPage }
