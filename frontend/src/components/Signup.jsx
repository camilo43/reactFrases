import { React, useState } from "react"
import { postUserInput, getPagejemplo, getUserInput } from "../axios/postAxios.js"
import { useNavigate } from "react-router-dom"
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

function Signup () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const navigate = useNavigate()
   
    // console.log('React version:', React.version);
    // console.log('ReactDOM version:', ReactDOM.version);

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
        console.log("ENTRA SUBMIT")
        event.preventDefault()
       
        if(password && password==confirmedPassword){;
            await postUserInput(userInput_signUp)   
            navigate("/auth")        
            await getUserInput()
            
        }else if(!password){
            console.log("NO PASSWORD", "Please type a password", password)
        }else if(password!=confirmedPassword){
            console.log("NO MATCH PASSWORD", "The confirmation is wrong", password,confirmedPassword);
        }else{
            navigate("/")
        }
    }
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