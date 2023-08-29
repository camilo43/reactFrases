import axios from "axios" 
axios.defaults.withCredentials = true;
// const url = "http://localhost:3002/"
const url = "https://backendfrases.onrender.com/"

const postUserInput = async (object) => {
    console.log("8888888888888 ENTRA postUserInput")
    // try{ 
        const userData = await axios.post(`${url}signup`, object, {
            withCredentials: true,
            credentials: 'include'
          })
        console.log("USER DATA_POST", userData)        
        return userData.data
    // }
    // catch (error){
    //     console.error(`The process can not be completed. Error description: ${error}`)
    // }
}
// const testCookiesGet = async () => { 
//     //try{
//         const response = await axios.get(`${url}test`)
//         // , {
//         //     withCredentials: true,
//         //     // credentials: 'include'
//         // })
//         console.log("TEST COOKIES", response.data); 
// }

// const testCookiesPost = async () => { 
//     //try{
//         const response = await axios.post(`${url}testPost`)
//         // , {
//         //     withCredentials: true,
//             // credentials: 'include'
//         // })
//         console.log("TEST COOKIES", response.data); 
// }

const getUserInput = async (object) => { 
    //try{
        const response = await axios.post(`${url}auth`, {
            // params:object,
            // withCredentials: true,
            // credentials: 'include'
          }) 

        console.log("RESPONSE NEW POST AXIOS", response.data);
        return response

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

console.log("AXIOS GET USER AUTHENTICATED+++>>>")
const getUserAuthenticated = async () => { 
    console.log("888888888 ENTRA USER AUTHENTICATED")
    try{
        const response = await axios.get(`${url}auth/autenticado`, {
            withCredentials: true,
            credentials: 'include'
          })
          console.log("RESPONSE AXIOS AUTHENTICATION", response.data.response);
          return response.data.response
        }catch(error){
            console.log("THERE HAS BEEN AN ERROR: EN AXIOS getUserAuthenticated ", error);
        } 
}

const getLogin = async () => {
    try{
        const response = await axios.get(`${url}login`)           
        if(response.status === 200){
            return response
        }
    }
    catch (error){
        console.error(`The process can not be completed. Error description: ${error}`)
    }
}
export { 
    postUserInput, 
    getUserInput, 
    getUserAuthenticated,
    getLogin
    // testCookiesGet,
    // testCookiesPost
}