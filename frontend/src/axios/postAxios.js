import axios from "axios" 
import { PagEjemplo } from "../components/PagEjemplo.jsx"

const url = "http://localhost:3002/"
// const url = "https://backendfrases.onrender.com/"

const postUserInput = async (object) => {
    console.log("POSTUSERINPUT ENTRA");    
    // try{ 
        const userData = await axios.post(`${url}`, object)
        console.log("USER DATA_POST", userData.data)        
        return userData.data
    // }
    // catch (error){
    //     console.error(`The process can not be completed. Error description: ${error}`)
    // }
}
const getUserInput = async (object) => { 
    //try{
        const response = await axios.post(`${url}auth`, {
            params:object,
            withCredentials: true,
            // credentials: 'include'
          }) 

        console.log("RESPONSE NEW POST AXIOS", response.data);
        // const cookies = response.headers['set-cookie'];
        // console.log("Cookies:", cookies);

        //   console.log("USERDATA AXIOS GET", response);
        //   return cookies
    //     if (userData.status === 200){
    //         return <Auth></Auth>
    //     }

    //     return userData.data
    // }
    // catch (error){
    //     console.error(`The process can not be completed. Error description: ${error}`)
    // }
}

const getUserAuthenticated = async () => { 
    //try{
        const response = await axios.get(`${url}auth/autenticado`, {
            withCredentials: true,
            // credentials: 'include'
          }) 

        console.log("RESPONSE GET_USER AUTHENTICATED", response);
}

const getPagejemplo = async () => {
    try{
        const userData = await axios.get(`${url}api/pagejemplo`)           
        if(userData.status === 200){
           
        }
    }
    catch (error){
        console.error(`The process can not be completed. Error description: ${error}`)
    }
}

export { postUserInput, getUserInput, getPagejemplo, getUserAuthenticated }