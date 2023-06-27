import axios from "axios" 
axios.defaults.withCredentials = true;
const url = "http://localhost:3002/"

const quotesGet = async () => {
    const userData = await axios.get(`${url}api/quotes`, {
      withCredentials: true,
      // credentials: 'include'
    }) 
     console.log("AXIOS GET", userData.data);
  return userData.data
}

const quotesInput = async (object) => {
    // try{ 
        const userData = await axios.post(`${url}api/quotes/user`, object, {
            params:object,
            withCredentials: true,
            // credentials: 'include'
          }) 
        console.log("USER DATA_POST", userData.data)        
        return userData.data
    }

    export { quotesInput, quotesGet }