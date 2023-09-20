import { React, useEffect, useState, useRef } from "react"
import { postUserInput } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"

function Signup () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [displayErrorMessage, setDisplayErrorMessage] = useState("")
    const [errorInfo, setErrorInfo] = useState("")
    const [differentPassword, setDifferentPassowrd] = useState("")
    
    const navigate = useNavigate()

    const nameOnChange = (event) => {
        setName(event.target.value)
    }

    const emailOnChange = (event) => {
        setEmail(event.target.value)
    }

    const passwordOnChange = (event) => {
        setPassword(event.target.value)
    }

    const confirmPassword = (event) => {
        setConfirmedPassword(event.target.value)
    }

    const userInput_signUp = {
        userName: name,
        email: email,
        password: password
    }
    
    //Navigate has to be used inside a BrowserRouter.
    //onSubmitForm now writes the URL in the browser and also returns values
    const onSubmitForm = async (event) => {     
        event.preventDefault()

        if(password && password==confirmedPassword){    
            try{
                await postUserInput(userInput_signUp)              
                             
            }catch (error){
                if(error.code === "ERR_BAD_REQUEST"){
                    console.log(`THERE HAS BEEN AN ERROR WITH THE PASSWORD VERIFICATION`);
                    setTimeout(() => {
                       setDisplayErrorMessage("")
                    }, 4000);
                    return
                }
            }           
            navigate("/auth")
           
        }
        else if(!password){
            setErrorInfo("Please type a password")
            setTimeout(() => {
                setErrorInfo("")
            }, 3000);

        }else if(password!=confirmedPassword){
            setDifferentPassowrd("The passwords do not match. Please type it again")
            setTimeout(() => {
                setDifferentPassowrd("")
            }, 3000);
        }
    }

    const cssVisibility = () => errorInfo == ""? {display : "none", color: "orange"} : {visibility :"visible", color: "orange"}
    
      const backHome = () => {
        navigate("/")
      }

    return(
        <div className="mainBox">
            <div className="mainBox_header">
                <button className="material-symbols-outlined home" onClick={backHome}>Home</button>
                <h2>Signup</h2>
                <h3 style={{color:"#bf5102"}}>{displayErrorMessage}</h3>
                <form onSubmit={onSubmitForm}>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={emailOnChange}></input>
                    <br></br>
                    <br></br>
                    <label>User name: </label>
                    <input type="text" value={name} onChange={nameOnChange}></input>
                    <br></br>
                    <br></br>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={passwordOnChange}></input>
                    <p style={cssVisibility()}>{errorInfo}</p>
                    <br></br>
                    <br></br>
                    <label>Confirm password: </label>
                    <input type="password" value={confirmedPassword} onChange={confirmPassword}></input>
                    <p>{differentPassword}</p>
                    <br></br>
                    <br></br>
                    <button onSubmit={onSubmitForm} type="submit">Submit</button>
                </form>
                </div>
        </div>
    )
}

export{ Signup }