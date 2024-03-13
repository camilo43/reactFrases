import axios from "axios" 
axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_URL_BACKEND
// const url = "http://localhost:3002"
// const url = "https://backendfrases.onrender.com/"
// const url = "https://www.api.camilovega.site"

const postUserInput = async (object) => {
    try{ 
        const userData = await axios.post(`${url}/signup`, object, {
            withCredentials: true,
            credentials: 'include'
          })
        return userData.data
    }catch (error){
        console.error("The process can not be completed. More details: ", error.response.data.error)
        return error.response.data.error
    }
}

const getUserInput = async (object) => { 
    try{
        const response = await axios.post(`${url}/auth`, object, {
            withCredentials: true,
            credentials: 'include'
          }) 
        return response.data

    }catch(error){
        console.error("The process can not be completed. More details: ", error)
    }
}

const getUserAuthenticated = async () => { 
    try{
        const response = await axios.get(`${url}/auth/authenticated`, {
            withCredentials: true,
            credentials: 'include'
          })
          return response.data
    }catch(error){           
        console.log("There was a problem when authenticating. More details: ", error);
    } 
}

const getLogin = async () => {
    try{
        const response = await axios.get(`${url}/login`,{
            withCredentials: true,
            credentials: 'include'
          })           
        if(response.status === 200){
            return response
        }
    }
    catch (error){
        console.error("The login process can not be completed. More details: ", error)
    }
}
export { 
    postUserInput, 
    getUserInput, 
    getUserAuthenticated,
    getLogin
}