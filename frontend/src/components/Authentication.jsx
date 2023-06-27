import { postUserInput_login } from "../axios/loginAxios"
import { Quotes } from "./Quotes"
import { useNavigate } from "react-router-dom";

function Authenticated () {
   
    const navigate = useNavigate()

    const pruebaFunc = postUserInput_login()
    
    setTimeout(() => {
        navigate("/api/quotes")
    }, 3000);

    if(pruebaFunc){
        return(
            <div>
                <h1>BIENVENIDO!</h1>
            </div>
        )
        }else{
        <h1>THE USER COULD NOT BE AUTHENTICATED</h1>
    }
}
export { Authenticated }