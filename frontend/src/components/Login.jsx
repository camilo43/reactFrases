import { React, useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { postUserInput_login } from "../axios/loginAxios.js"
import { getUserInput } from "../axios/postAxios.js"

function Login () {
    const navigate = useNavigate()
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [controlDisplay, setControlDisplay] = useState(false)

//---------------- EXAMPLE USEREF-- ----------------

    // const hideMessage = useRef()

    // const timer = () => {
    //     setTimeout(() => {
    //         hideMessage.current.style.visibility = "hidden"
    //     }, 5000);
    // }

    // useEffect(() => {
    //     timer();
    //   }, []);

//---------------- ***FIN EXAMPLE USEREF***------------------

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
    // console.log("=====> EMAIL", email);
    // console.log("=====> PASSWORD", password);

    const formOnSubmit = async (event) => {
        event.preventDefault()
        if(userLogin.email && userLogin.password){
            const ejemplo= await postUserInput_login(userLogin)
            console.log("=====> oi oi oi oi ESTE ES EL EJMEPLO", ejemplo);
            if(ejemplo != "COOKIE sent"){
                setControlDisplay(true) 
                setEmail("")
                setPassword("")
                setTimeout(() => {
                    setControlDisplay(false)
                }, 5000);
            }else{
                setTimeout(async () => {
                    const getUser = await getUserInput(userLogin)
                    const ejemplo= await postUserInput_login(userLogin)
                    console.log("=====> oi oi oi oi ESTE ES EL EJMEPLO", ejemplo);
                    // getUser(userLogin)
                    console.log("GET USER >> LOGIN", getUser)
                    navigate("/auth")
                }, 2000); 
                return ejemplo
            }
        }else{
            console.log("EMAIL AND PASSWORD ARE MANDATORY FIELDS")
        }
    }   
    
    // const backHome = () => {
    //     navigate("/")
    // }
    return(
        <div>
            <div>
            {/* <h1 ref={hideMessage}>
                THIS IS THE CRAZY MONKEY
            </h1> */}
            {/* <button onClick={backHome}>Home</button>   */}
                <h2>Login</h2>         
                <form onSubmit={formOnSubmit}>
                    <label>Email </label>
                    <input onChange={emailOnChange} value={email} type="email"></input>
                    <br></br>
                    <br></br>
                    <label>Password </label>
                    <input onChange={passwordOnChange} value={password} type="password"></input>
                    <br></br>
                    <br></br>
                   <div style={controlDisplay==true? {display:"inline"} : {display:"none"}}>
                        <h1>The user does not exist, please Sign In</h1>
                   </div>
                    <button onClick={formOnSubmit} type="submit">Submit</button>
                </form>
            </div> 
        </div>
       
    )
}

export { Login }