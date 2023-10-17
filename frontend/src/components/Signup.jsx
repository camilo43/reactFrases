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
    const [errorUserName, setErrorUserName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    
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
                const checkingUserCredentials = await postUserInput(userInput_signUp)
                console.log("CHEKING", checkingUserCredentials)
                if(checkingUserCredentials == "Repeated email"){
                    setName("")
                    setPassword("")
                    setConfirmedPassword("")
                    setErrorEmail("This email is already registered. Please log in.")
                    setTimeout(() => {
                        setEmail("")
                        setErrorEmail("")
                    }, 4000);
                   
                }else if(checkingUserCredentials == "Repeated user"){
                    setErrorUserName("This username is already in use. Please choose another one.")
                    setTimeout(() => {
                        setErrorUserName("")
                    }, 3000);
                }else{
                    navigate("/auth")
                } 
                       
            }catch (error){
                if(error.code === "ERR_BAD_REQUEST" || error.code === "The process can not be completed"){
                    console.log(`THERE HAS BEEN AN ERROR WITH THE PASSWORD VERIFICATION`);
                    setTimeout(() => {
                       setDisplayErrorMessage("")
                    }, 4000);
                    return
                }
            }              
        }
        else if(!password){
            setErrorInfo("Please type a password")
            setTimeout(() => {
                setErrorInfo("")
            }, 3000);

        }else if(password!=confirmedPassword){
            setDifferentPassowrd("The passwords do not match. Please retype them.")
            setTimeout(() => {
                setDifferentPassowrd("")
            }, 3000);
        }
    }

    const cssVisibility = () => errorInfo == ""? {display : "none", color: "#b60000"} : {visibility :"visible", color: "#b60000"}
    const cssVisibilityUser = () => errorUserName == ""? {visibility : "hidden", color: "#b60000"} : {visibility :"visible", color: "#b60000"}
    const cssVisibilityEmail = () => errorEmail == ""? {visibility : "hidden", color: "#b60000"} : {visibility :"visible", color: "#b60000"}
      const backHome = () => {
        navigate("/")
      }

    return(
        <div className="centerDiv">
            <div>
                <div className="home">
                    <button className="material-symbols-outlined" onClick={backHome}><span style={{visibility:"hidden"}}>Home</span></button>
                </div>
                <h2>Signup</h2>
                <h3 style={{color:"#b60000"}}>{displayErrorMessage}</h3>
                <form onSubmit={onSubmitForm}>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={emailOnChange}></input>
                    <p style={cssVisibilityEmail()}>{errorEmail}</p>
                    <label>User name: </label>
                    <input type="text" value={name} onChange={nameOnChange}></input>
                    <p style={cssVisibilityUser()}>{errorUserName}</p>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={passwordOnChange}></input>
                    <p style={cssVisibility()}>{errorInfo}</p>
                    <br></br>
                    <br></br>
                    <label>Confirm password: </label>
                    <input type="password" value={confirmedPassword} onChange={confirmPassword}></input>
                    <p style={{color:"#b60000"}}>{differentPassword}</p>
                    <br></br>
                    <br></br>
                    <button onSubmit={onSubmitForm} type="submit">Submit</button>
                </form>
                </div>
        </div>
    )
}

export{ Signup }