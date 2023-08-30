import axios from "axios" 
// axios.defaults.withCredentials = true;
// const url = "http://localhost:3002/"
const url = "https://backendfrases.onrender.com/"

const postUserInput_login = async (object) => {
    try{ 
        const userData = await axios.post(`${url}login`,object, {
            withCredentials: true,
            credentials: 'include'
        })       
        return userData.data
    }catch(error){
        console.log("EL BACKEND HA REGRESADO UN ERROR");        
    }
}

export { postUserInput_login } 