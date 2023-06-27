import axios from "axios" 
import { PagEjemplo } from "../components/PagEjemplo.jsx"
axios.defaults.withCredentials = true;
const url = "http://localhost:3002/"
// const url = "https://backendfrases.onrender.com/"

const postUserInput_login = async (object) => {
    console.log("ESTAMOS EN AXIOS VERIFICANDO1");
    try{ 
        console.log("ESTAMOS EN AXIOS VERIFICANDO2")
        const userData = await axios.post(`${url}login`,object, {
            withCredentials: true,
            //credentials: 'include'
        })
        console.log("ESTAMOS EN AXIOS VERIFICANDO3") 
        console.log("USER DATA_POST", userData)        
        return userData.data
    }catch(error){
        console.log("EL BACKEND HA REGRESADO UN ERROR");        
    }
}

export { postUserInput_login }