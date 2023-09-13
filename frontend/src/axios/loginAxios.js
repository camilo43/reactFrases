import axios from "axios" 
// axios.defaults.withCredentials = true;
// const url = "http://localhost:3002"
// const url = "https://backendfrases.onrender.com/"
// const url = "https://www.backendprojects.site"
const url = "https://www.api.camilovega.site"
//PRUEBA SE SALVA LA QUE ES

const postUserInput_login = async (object) => {
    try{ 
        console.log("URL", url)
        const userData = await axios.post(`${url}/login`,object, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log("AXIOS >> postUserInput_login >>  userData.data",  userData.data)   //COOKIE sent    
        return userData.data
    }catch(error){
        console.log("EL BACKEND HA REGRESADO UN ERROR");        
    }
}

export { postUserInput_login } 