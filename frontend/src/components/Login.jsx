import { React, useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postUserInput_login, getUserInput_login } from "../axios/loginAxios.js"
import { getUserInput } from "../axios/postAxios.js"

function Login ({loaderVisibility}) {
    const navigate = useNavigate()
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [controlDisplay, setControlDisplay] = useState(false)
    const [emptyAuthentification, setEmptyAuthentification] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
        const initialize = async () => {
            const algo = await getUserInput_login();
            console.log("=====>", algo);
        }
        initialize();
    }, []);

    useEffect(() => {
        const initializingApp = async () => await getUserInput_login()
        initializingApp()
    }, []);


    const emailOnChange = (event) => {
        setEmail(event.target.value)
    }

    const passwordOnChange = (event) => {
        setPassword(event.target.value)
    }

    const userLogin = {
        email:email,
        password: password
    }
    const formOnSubmit = async (event) => {
        event.preventDefault()

        if(userLogin.email && userLogin.password){
            loaderVisibility()
            const postUserLogin= await postUserInput_login(userLogin)
            
            if(postUserLogin != "COOKIE sent"){
                if(postUserLogin == "Invalid email" || postUserLogin == "The password is wrong"){
                    if(postUserLogin == "Invalid email"){
                        setEmailError(postUserLogin)
                    }else if(postUserLogin == "The password is wrong"){
                        setPasswordError(postUserLogin)
                    }
                    loaderVisibility(false)
                    setControlDisplay(true)
                    setPassword("") 
                    setTimeout(() => {
                        setEmailError("")
                        setPasswordError("")
                        setControlDisplay(false)
                    }, 5000);
                }else{
                    setEmailError(postUserLogin)
                    loaderVisibility(false)
                    setControlDisplay(true) 
                    setEmail("")
                    setPassword("")
                    setTimeout(() => {
                        setControlDisplay(false)
                    }, 5000);
                }
            }else{
                setTimeout(() => {
                    navigate("/auth")
                }, 3000);
                
                return postUserLogin
            }
        }else{
            setEmptyAuthentification(true)
            setTimeout(() => {
                setEmptyAuthentification(false)
            }, 3000);
            console.log("EMAIL AND PASSWORD ARE MANDATORY FIELDS")
        }
    }   
    
    return(
        <div>
            <div>
                <h2>Login</h2> 
                <div style={!emptyAuthentification?{display:"none"}:{display:"block",color:"#b60000"}}>
                    <p>Email and password are mandatory fields</p>
                </div>        
                <form onSubmit={formOnSubmit}>
                    <label>Email </label>
                    <input onChange={emailOnChange} value={email} type="email"></input>
                    <div style={controlDisplay==true? {display:"flex", color:"#b60000"} : {display:"none"}}>
                        <p>{emailError}</p>
                   </div>
                    <br></br>
                    <br></br>
                    <label>Password </label>
                    <input onChange={passwordOnChange} value={password} type="password"></input>
                   <div style={controlDisplay==true? {display:"flex", color:"#b60000"} : {display:"none"}}>
                        <p>{passwordError}</p>
                   </div>
                   <br></br>
                   <br></br>
                    <button onClick={formOnSubmit} type="submit">Submit</button>
                </form>
            </div> 
        </div>
       
    )
}

export { Login }