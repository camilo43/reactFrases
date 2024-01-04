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
    const [itsVisible, setItsVisible] = useState("none")
    const navigate = useNavigate()

    const inputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputRef.current) {
            event.preventDefault();
            onSubmitForm(event)
            inputRef.current.blur();
        };
    }

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
    
    const changingVisibility = (control=true) => {
        if(control === true){
            setItsVisible("block")
        }else{
            setItsVisible("none")
        }
       
    }

    //Navigate has to be used inside a BrowserRouter.
    //onSubmitForm now writes the URL in the browser and also returns values
    const onSubmitForm = async (event) => { 
        event.preventDefault()
        changingVisibility()
        
        if(!email){
            changingVisibility(false)
            setErrorEmail("An email is required")
            setTimeout(() => {
                setErrorEmail("")
            }, 4000);
        }
        else if(!name){
            changingVisibility(false)
            setErrorUserName("A name is required")
            setTimeout(() => {
                setErrorUserName("")
            }, 4000);
        }
        else if(password && password==confirmedPassword){ 
              
            try{
                const checkingUserCredentials = await postUserInput(userInput_signUp)

                if(checkingUserCredentials == "Invalid email"){
                    changingVisibility(false)
                    setErrorEmail("The email is not valid")
                    setTimeout(() => {
                        setErrorEmail("")
                    }, 4000);
                }
                else if(checkingUserCredentials == "Email requested"){
                    changingVisibility(false)
                    setErrorEmail("Please type your email")
                    setTimeout(() => {
                        setErrorEmail("")
                    }, 4000);
                }
                else if(checkingUserCredentials == "User name requested"){
                    changingVisibility(false)
                    setErrorUserName("Please choose a user name")
                    setTimeout(() => {
                        setErrorUserName("")
                    }, 4000);
                }                
                else if(checkingUserCredentials == "Repeated email"){
                    changingVisibility(false)
                    setName("")
                    setPassword("")
                    setConfirmedPassword("")
                    setErrorEmail("This email is already registered. Please log in.")
                    setTimeout(() => {
                        setEmail("")
                        setErrorEmail("")
                    }, 4000);
                   
                }else if(checkingUserCredentials == "Repeated user"){
                    changingVisibility(false)
                    setErrorUserName("This username is already in use. Please choose another one.")
                    setTimeout(() => {
                        setErrorUserName("")
                    }, 4000);
                }else{
                    changingVisibility(false)
                    navigate("/auth")
                } 
                       
            }catch (error){
                changingVisibility(false)
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
            changingVisibility(false)
            setErrorInfo("Please type a password")
            setTimeout(() => {
                setErrorInfo("")
            }, 4000);
        }else if(password!=confirmedPassword){
            changingVisibility(false)
            setDifferentPassowrd("The passwords do not match. Please retype them.")
            setTimeout(() => {
                setDifferentPassowrd("")
            }, 4000);
        }
    }

    const cssVisibility = () => errorInfo == ""? {display : "none", color: "#b60000"} : {visibility :"visible", color: "#b60000"}
    const cssVisibilityUser = () => errorUserName == ""? {visibility : "hidden", color: "#b60000"} : {visibility :"visible", color: "#b60000"}
    const cssVisibilityEmail = () => errorEmail == ""? {visibility : "hidden", color: "#b60000"} : {visibility :"visible", color: "#b60000"}

    const backHome = () => {
        navigate("/")
      }

    return(
        <>
         <div className="whitePageLoader" style={{display:itsVisible}}/>  
         <div className="backgroundColorPage fadeIn">
            <header className="header headerColor">
                <button className="home buttonHome" onClick={backHome}>
                    Home
                </button>
                {/* <button className="material-symbols-outlined home buttonHome" onClick={backHome}><span>Home</span></button> */}
            </header>
            <div className="centerDiv ">
            <div className="loader" style={{display:itsVisible}}/> 
            <div className="signUpContent ">
                <h2 className="signUpText">Signup</h2>
                <h3 style={{color:"#b60000"}}>{displayErrorMessage}</h3>
                <form onSubmit={onSubmitForm} onKeyDown={handleKeyDown}>
                    <label>Email: </label>
                    <input type="text" value={email} onChange={emailOnChange} ref={inputRef}></input>
                    <p style={cssVisibilityEmail()}>{errorEmail}</p>
                    <label>User name: </label>
                    <input type="text" value={name} onChange={nameOnChange} ref={inputRef}></input>
                    <p style={cssVisibilityUser()}>{errorUserName}</p>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={passwordOnChange} ref={inputRef}></input>
                    <p style={cssVisibility()}>{errorInfo}</p>
                    <br></br>
                    <br></br>
                    <label>Confirm password: </label>
                    <input type="password" value={confirmedPassword} onChange={confirmPassword} ref={inputRef}></input>
                    <p style={{color:"#b60000"}}>{differentPassword}</p>
                    <br></br>
                    <br></br>
                    <button onClick={onSubmitForm} type="submit">Submit</button>
                </form>
                </div>
            </div>
        </div>
        </>
        
    )
}

export{ Signup }