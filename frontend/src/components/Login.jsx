import { React, useState } from "react"
import { useNavigate } from "react-router-dom"
import { postUserInput_login } from "../axios/loginAxios.js"

function Login () {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [controlDisplay, setControlDisplay] = useState(false)

    const emailOnChange = (event) => {
        setEmail(event.target.value)
        console.log(">>email", email);
    }

    const passwordOnChange = (event) => {
        setPassword(event.target.value)
        console.log(">>password", password);
    }
    const userLogin = {
        email:email,
        password: password
    }
    const errorText = () => {
        
        return 
    }
    const formOnSubmit = async (event) => {
        event.preventDefault()
        if(userLogin.email && userLogin.password){
            console.log("PASA PRUEBA ESPACIOS NO VAC[IOS");
            const ejemplo= await postUserInput_login(userLogin)
            if(ejemplo != "COOKIE sent"){
                setControlDisplay(true)
                setTimeout(() => {
                    setControlDisplay(false)
                }, 3000);
            }else{
                setTimeout(() => {
                    navigate("/auth")
                }, 2000); 
                return ejemplo
            }
        }else{
            console.log("EMAIL AND PASSWORD ARE MANDATORY FIELDS")
        }
    }

   

    const backHome = () => {
        navigate("/")
    }
    return(<div> 
            <button onClick={backHome}>Home</button>  
            <h2>Login</h2>         
            <form onSubmit={formOnSubmit}>
                <label>Email </label>
                <input onChange={emailOnChange} type="email"></input>
                <br></br>
                <br></br>
                <label>Password </label>
                <input onChange={passwordOnChange} type="password"></input>
                <br></br>
                <br></br>
               <div style={controlDisplay==true? {display:"inline"} : {display:"none"}}>
                    <h1>The user does not exist</h1>
               </div>
                <button onClick={formOnSubmit} type="submit">Submit</button>
            </form>
        </div>
       
    )
}

export { Login }