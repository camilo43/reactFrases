import axios from "axios" 
// axios.defaults.withCredentials = true;
// const url = "http://localhost:3002/"
// const url = "https://backendfrases.onrender.com/"
const url = "https://www.camilovega.site/"

const quotesGetLogOut = async () => {
  return await axios.get(`${url}api/quotes/user/logout`, {
    withCredentials: true,
    credentials: 'include'
  })    
}

const quotesGet = async () => {
    const userData = await axios.get(`${url}api/quotes`, {
      withCredentials: true,
      credentials: 'include'
    }) 
     console.log("AXIOS GET", userData.data);
  return userData.data
}

const quotesInput = async (object) => {
    // try{ 
        const userData = await axios.post(`${url}api/quotes/user`, object, {
            // params:object,
            withCredentials: true,
            credentials: 'include'
          }) 
        console.log("USER DATA_POST", userData.data)        
        return userData.data
    }
  
const deleteQuotes = async (itemId) => {
  console.log("ITEMiD ------------->>>>>>>>", itemId.id);
  const itemIdString = itemId.id
    return await axios.delete(`${url}api/quotes/${itemIdString}`, {
      params: itemId,
      withCredentials: true
    });    
};


    export { quotesInput, quotesGet, quotesGetLogOut, deleteQuotes }