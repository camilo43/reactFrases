import axios from "axios" 
import { PagEjemplo } from "../components/PagEjemplo.jsx"

// const url = "http://localohost:3002/"
const url = "https://backendfrases.onrender.com/"

const postUserInput = async (object) => {
    try{ 
        // const token = await cookies.get("tokenBearer")        
        // console.log("POST>>TOKEN RECEIVED", token)       
        const userData = await axios.post(`${url}`, object) 
        console.log("USER DATA_POST", userData)
        return userData.data
    }
    catch (error){
        console.error(`The process can not be completed. Error description: ${error}`)
    }
}

const getUserInput = async () => {
    try{
        const userData = await axios.get(`${url}auth`) 
        console.log(">>USER_DATA GET", userData)
        return userData.data
    }
    catch (error){
        console.log("URL", URL);
        console.error(`The process can not be completed. Error description: ${error}`)
    }
}

const getPagejemplo = async () => {
    try{
        const userData = await axios.get(`${url}api/pagejemplo`)           
        if(userData.status === 200){
            return <PagEjemplo></PagEjemplo>
        }
    }
    catch (error){
        console.error(`The process can not be completed. Error description: ${error}`)
    }
}

export { postUserInput, getUserInput, getPagejemplo }