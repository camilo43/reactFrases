import { React, useState, useReducer, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { postUserInput_login, getUserInput_login } from "../axios/loginAxios.js"
import axios from 'axios';

function  Login ({loaderVisibility}) {
    const navigate = useNavigate()
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [controlDisplay, setControlDisplay] = useState(false)
    const [emptyAuthentification, setEmptyAuthentification] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    //************************ */
    
    const inputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputRef.current) {
            event.preventDefault();
            inputRef.current.blur();
            formOnSubmit(event)
            
        };
    }

    const enviarCodigoAlBackend = async (code) => {try {
        const response = await axios.post('http://localhost:3002/auth/google/token', {
          code,
        });
    
      } catch (error) {
        console.error('Error al enviar el código al backend:', error);
      }
    }
    
      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
    
        if (code) {
          enviarCodigoAlBackend(code);
        }
      }, []); 

   //************************ */
   
    useEffect(() => {
        const initializingApp = async () => await getUserInput_login()
        initializingApp()
    }, []);

    const redirectSignUp = () => {
        navigate("/signup")
    }

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
            console.log(">>>>>>>>> postUserLogin", postUserLogin)
            
            if(postUserLogin != "COOKIE sent"){
                if(postUserLogin == "Invalid email" || postUserLogin == "The password is wrong"){
                    if(postUserLogin == "Invalid email"){
                        setEmailError(postUserLogin)
                        setPasswordError("")
                    }else if(postUserLogin == "The password is wrong"){
                        setPasswordError(postUserLogin)
                        setEmailError("")
                    }
                    loaderVisibility(false)
                    setPassword("") 
                    setTimeout(() => {
                        setEmailError("")
                        setPasswordError("")
                        setControlDisplay(false)
                    }, 5000);
                }else{
                    setEmailError(postUserLogin)
                    loaderVisibility(false)
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
    console.log("EMAIL ERROR", emailError)
    const redirectingGoogle = async () => {
        const urlAuth = await google_gettingTokens()
        return urlAuth
    }
    
    return(
        <div className="divLogin_immediateChild">
            <div>
                <h2>Login</h2> 
                <div style={!emptyAuthentification?{display:"none"}:{display:"block", color:"#D64933"}}>
                    <p>Email and password are mandatory fields</p>
                </div>
                <form onSubmit={formOnSubmit} onKeyDown={handleKeyDown}>
                    <label>Email </label>
                    <input placeholder="example@email.com" onChange={emailOnChange}  ref={inputRef} value={email} type="email"></input>
                        <div style={emailError === ""?{display:"none"}:{display:"block", color:"#D64933", fontWeight:"500"}}>
                            <h4>{emailError}</h4>
                        </div>
                    <br></br>
                    <br></br>
                    <label>Password </label>
                    <input onChange={passwordOnChange} ref={inputRef} value={password} type="password"></input>
                        <div style={passwordError === ""?{display:"none"}:{display:"block", color:"#D64933"}}>
                            <h4>{passwordError}</h4>
                        </div>
                        <br></br>
                        <br></br>
                   <div style={controlDisplay==true? {display:"inline", color:"#D64933"} : {display:"none"}}>
                        <h4>The user does not exist, please Sign Up</h4>
                   </div>
                    <button onClick={formOnSubmit} type="submit">Submit</button>
                </form>

                <div className="google-button-main-container">
                    <div className="google-icon-container">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google &quot;G&quot; logo.svg" width="24" height="24"/>
                    </div>
                    {/* <button className="google-button"><a className="google-link" href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=14549060393-rdlcf6ftfu8qiommco6tt4sla1of4vqf.apps.googleusercontent.com&prompt=consent&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">Sign in with Google</a></button> */}

                    <button className="google-button"><a className="google-link" href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=14549060393-rdlcf6ftfu8qiommco6tt4sla1of4vqf.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fwww.api.camilovega.site%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">Sign in with Google</a></button>
                   
                </div>
                <p className="membershipInvitation">Do you want to add your own quote? If you're not a member yet, <a href={"#"} style={{color:"black"}} onClick={redirectSignUp}>register</a> for free and share it with the world</p>
               
            </div> 
        </div>
       
    )
}

export { Login }