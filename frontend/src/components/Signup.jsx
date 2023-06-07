import { React, useEffect, useState } from "react"
import { postUserInput, getPagejemplo, getUserInput } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

function Signup () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [controlBoolean, setControlBoolean] = useState(false)

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
                console.count("SignUp POST")
                await postUserInput(userInput_signUp)
                await getUserInput(userInput_signUp)
                navigate("/auth")
             
            }catch (error){
                console.log(`THERE HAS BEEN AN ERROR, DETAILS: ${error}`);
            }
           
        }
        else if(!password){
            console.log("NO PASSWORD", "Please type a password", password)
        }else if(password!=confirmedPassword){
            console.log("NO MATCH PASSWORD", "The confirmation is wrong", password,confirmedPassword);
        }
    }
      //.............................REVISAR LOS ERRORES, SI EL BACKEND EST[A FALLLAND] NO CORRE EL RESTO DEL CODIGO.......
    
    return(
        <div>
            <p>Join our comunity for free</p>
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
    )
}

export{ Signup }