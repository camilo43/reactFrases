import axios from "axios" 
// axios.defaults.withCredentials = true;
// const url = "http://localhost:3002"
// const url = "https://backendfrases.onrender.com/"
// const url = "https://www.backendprojects.site"
const url = "https://www.api.camilovega.site"

const getUserInput_login = async (object) => {
    try{        
        const serverMessage = await axios.get(`${url}/`,object, {
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
        console.log("URL", url)
        const userData = await axios.post(`${url}/login`,object, {
            withCredentials: true,
            credentials: 'include'
        })
        return userData.data
    }catch(error){
        console.log("The login process could not be completed. More details: ", error);        
    }
}

export { postUserInput_login, getUserInput_login } 