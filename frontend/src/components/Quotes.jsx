import { useState, useEffect, useReducer } from "react";
import { quotesInput, quotesGet, deleteQuotes } from "../axios/quotesAxios";
import { useNavigate } from "react-router-dom"

function Quotes () {
    const [userQuote, setUserQuote] = useState("")
    let [listQuotes, setListQuotes] = useState([])
    const [triggerBoolean, setTriggerBoolean] = useState(false)
    const [cssTrigger, setCssTrigger] = useState(false)
    const [emptyMessageCss, setEmptyMessageCss] = useState(false)

    const navigate = useNavigate()
    
    const quoteModel = {
        content:userQuote
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const quotes = await quotesGet();
              setListQuotes(quotes);
            }catch (error) {
                setCssTrigger(true)
                console.error("There was an error while trying to get the information", error);
            }
          };
          fetchData();       
    }, [triggerBoolean]);

    const inputSubmit = async (event) => {
        event.preventDefault()
            try{
               if(userQuote === ""){
                    setEmptyMessageCss(true)
                    setTimeout(() => {
                    setEmptyMessageCss(false)
                }, 5000)
                }else{
                await quotesInput(quoteModel)
                }
            }catch(error){
                setTriggerBoolean(!triggerBoolean)
            }        
        if(userQuote){
            setTriggerBoolean(!triggerBoolean)
            setUserQuote("")
        }
    }
  
    const goingBackHome = () => {
        navigate("/")
    }

    const loggingOut = () => {
        navigate("/api/quotes/user/logout")
    }
    
    const handleDelete = async (index, id) => {        
        const updatedItems = listQuotes.filter((_, i) => i !== index);
        setListQuotes(updatedItems);
        await deleteQuotes({id:id})
        return updatedItems
      };

    const inputUserQuote = (event) => {
        event.preventDefault()
        const userInput = event.target.value
        setUserQuote(userInput)
    }

    const FormSubmitQuotes = () => {    
        return(
            <form onSubmit={inputSubmit}>
                <textarea className="textBox" onChange={inputUserQuote} value={userQuote} placeholder="Please type here"></textarea>
                <br/>
                <br/>
                <button type="submit">
                    Submit
                </button>
            </form>)
    } 

     const MappingList = () => {
        return listQuotes.map((quote,index) => {
            console.count("ESTE ES EL CONUNT DEL map")
            console.log("TIGGER", triggerBoolean)
            if(quote==null){
                setListQuotes([])
            }else{
                return(
                    <ul className="esteUl fadeIn" key={quote.id}>
                        <div className="ulBox_delete-list">
                            <li className="ulBox_div" style={{backgroundColor:"#EEE5E9", borderRadius:"10px"}}>
                                <button onClick={()=> {handleDelete(index, quote.id)}} className="material-symbols-outlined buttonHide buttonShow"><span>Delete</span></button>
                            {quote.content}</li> 
                        </div>
                    </ul>
                    )
            }
        })  
         
    }
   
    return(
        <>
            <header className="header">
                <button className="button_logout buttonTryFree fadeIn" onClick={loggingOut} style={cssTrigger?{display:"none"}:{display:"visible"}}>Logout</button>
            </header>
            <div className="centerDiv fadeIn">
                <div className="mainDiv">
                    <div style={!emptyMessageCss?{display:"none"}:{display:"block", color:"#D64933"}}>
                        <p>The input can not be a blank space</p>
                    </div>
                    <div className="fadeIn" style={!cssTrigger?{display:"none"}:{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <h1>Your session has expired, please login again</h1>
                        <button onClick={goingBackHome}>Home</button>
                    </div>
                    <div style={cssTrigger?{visibility:"hidden"}:{visibility:"visible", width:"100%"}}>
                        <div>
                            {FormSubmitQuotes()}
                            {MappingList()}
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    )
}

export { Quotes }
