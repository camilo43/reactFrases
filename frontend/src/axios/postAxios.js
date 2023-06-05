import axios from "axios" 
import { PagEjemplo } from "../components/PagEjemplo.jsx"

// const url = "http://localhost:3002/"
const url = "https://backendfrases.onrender.com/"

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
    } 

const postUserInput = async (object) => {
    //axios.defaults.withCredentials = true;
    try{ 
        // const token = await cookies.get("tokenBearer")        
        // console.log("POST>>TOKEN RECEIVED", token)       
        const userData = await axios.post(`${url}`, object, config)
        console.log("USER DATA_POST", userData)         
        return userData.data
    }
    catch (error){
        console.error(`The process can not be completed. Error description: ${error}`)
    }
}

const getUserInput = async () => {    
    //try{
        const userData = await axios.get(`${url}auth`, config) 
          return userData.data
        
    //     if (userData.status === 200){
    //         return <Auth></Auth>
    //     }

    //     return userData.data
    // }
    // catch (error){
    //     console.error(`The process can not be completed. Error description: ${error}`)
    // }
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