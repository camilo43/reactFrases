import { React, useEffect, useState, useRef } from "react"
import { postUserInput, getPagejemplo, getUserInput, testCookiesGet, testCookiesPost } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

function Signup () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [controlBoolean, setControlBoolean] = useState(false)
    const [displayErrorMessage, setDisplayErrorMessage] = useState("")
    
    const navigate = useNavigate()
    const errorMessage = useRef()

    const displayErrorMessageRef = (errorType) => {
       setDisplayErrorMessage(`The ${errorType}. Please choose another one`)
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
    
    //Navigate has to be used inside a BrowserRouter.
    //onSubmitForm now writes the URL in the browser and also returns values
    const onSubmitForm = async (event) => { 
        console.log("===========>> // ENTRA ON SUBMIT FORM")        
        event.preventDefault()

        if(password && password==confirmedPassword){      
            console.log("===========>> // ENTRA PASO 1")      
            try{
                console.log("===========>> // ENTRA PASO 2")     
                
                // await testCookiesGet()
                // await testCookiesPost()
                await postUserInput(userInput_signUp)                
                             
            }catch (error){
                console.log("EVALUANDO ERROR RESPONSE.DATA")
                if(error.code === "ERR_BAD_REQUEST"){
                    console.log(`THERE HAS BEEN AN ERROR WITH THE PASSWORD VERIFICATION`);
                    //displayErrorMessageRef(error.response.data.post)
                    setTimeout(() => {
                       setDisplayErrorMessage("")
                    }, 4000);
                    return
                }
            }
            console.log("===========>> // ENTRA PASO 3") 
            await getUserInput(userInput_signUp)
            navigate("/auth")
           
        }
        else if(!password){
            console.log("NO PASSWORD", "Please type a password", password)
        }else if(password!=confirmedPassword){
            console.log("NO MATCH PASSWORD", "The confirmation is wrong", password,confirmedPassword);
        }
    }

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
                    <br></br>
                    <br></br>
                    <label>Confirm password: </label>
                    <input type="password" value={confirmedPassword} onChange={confirmPassword}></input>
                    <br></br>
                    <br></br>
                    <button onSubmit={onSubmitForm} type="submit">Submit</button>
                </form>
                </div>
        </div>
    )
}

export{ Signup }