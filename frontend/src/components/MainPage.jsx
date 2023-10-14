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
        <div className="centerDiv">
            <div className="loader" style={{display:itsVisible}}/> 
            <div className="whitePageLoader" style={{display:itsVisible}}/>   
            <div>
                <div>
                    <h1>Create a quote and save it</h1>
                    <Login loaderVisibility={changingVisibility} ></Login>
                    <br></br>
                    <p>Not a member yet? <a href={"#"} onClick={redirectSignUp}>SignUp</a> to become part of our community</p>
                </div>
            </div>
        </div>
        
    )
}
export { MainPage }
