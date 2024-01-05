import axios from "axios" 
// axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_URL_BACKEND
// const url = "http://localhost:3002"
// const url = "https://backendfrases.onrender.com/"
// const url = "https://www.backendprojects.site"
// const url = "https://www.api.camilovega.site"

console.log("THIS IS THE URL", url)
const getUserInput_login = async () => {
    try{        
        const serverMessage = await axios.get(`${url}/`, {
            withCredentials: true,
            credentials: 'include'
        })
        return serverMessage.data
    }catch(error){
        console.log("The page could not be loaded");        
    }
}

const postUserInput_login = async (object) => {
    try{ 
        const userData = await axios.post(`${url}/login`,object, {
            withCredentials: true,
            credentials: 'include'
        })
        
        console.log(">>>>>>>>> userData", userData.data)
        return userData.data
    }catch(error){
        console.log("The login process could not be completed.", error.response.data.error); 
        return  error.response.data.error       
    }
}

export { postUserInput_login, getUserInput_login } 