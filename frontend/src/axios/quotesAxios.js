import axios from "axios" 
// axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_URL_BACKEND
// const url = "http://localhost:3002"
// const url = "https://backendfrases.onrender.com/"
// const url = "https://www.api.camilovega.site"

const quotesGetLogOut = async () => {
  try{
    return await axios.get(`${url}/user/logout`, {
      withCredentials: true,
      credentials: 'include'
    }) 
  }catch(error){
    console.log("Logging out process could not be completed", error)
  }
}

const quotesGet = async () => {
  try{
    const userData = await axios.get(`${url}/api/quotes`, {
      withCredentials: true,
      credentials: 'include'
    }) 
   
    return (userData.data).reverse()
  }catch(error){
    console.log("Quotes could not be listed. More details:", userData)
  }
}

const quotesInput = async (object) => {
    try{ 
        const userData = await axios.post(`${url}/api/quotes`, object, {
            // params:object,
            withCredentials: true,
            credentials: 'include'
          }) 
    }catch(error){
      console.log("The quote could not be posted. More details: ", error)
    }
}
  
const deleteQuotes = async (itemId) => {
  try{
    const itemIdString = itemId.id
    const deletingElement = await axios.delete(`${url}/api/quotes/${itemIdString}`, {
    params: itemId,
    withCredentials: true,
    credentials: 'include'
  })
  return deletingElement.data
  }catch(error){
    console.log("The quote could not be deleted. More details: ")
  }
};

export { quotesInput, quotesGet, quotesGetLogOut, deleteQuotes }