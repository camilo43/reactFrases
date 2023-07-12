import { useState, useEffect } from "react";
import { quotesInput, quotesGet, deleteQuotes } from "../axios/quotesAxios";
import { useNavigate } from "react-router-dom"

function Quotes () {
    const [userQuote, setUserQuote] = useState("")
    const [listQuotes, setListQuotes] = useState([])
    const [triggerBoolean, setTriggerBoolean] = useState(false)
    const [cssTrigger, setCssTrigger] = useState(false)

    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const quotes = await quotesGet();
              setListQuotes(quotes);              
            } catch (error) {
                setCssTrigger(true)
                console.error("Error al obtener la información:");
            }
          };
          fetchData();          
    }, [triggerBoolean]);

    const quoteModel = {
        content:userQuote
    }

    const inputSubmit = async (event) => {
        event.preventDefault()
            try{
                await quotesInput(quoteModel)
            }catch(error){
                setTriggerBoolean(!triggerBoolean)
            }        
        if(userQuote){
            setTriggerBoolean(!triggerBoolean)
            setUserQuote("")
        }
    }
        
    const inputUserQuote = (event) => {
        setUserQuote(event.target.value);
    }
  
    const goingBackHome = () => {
        navigate("/")
    }

    const loggingOut = () => {
        navigate("/api/quotes/user/logout")
    }

    const deleteQuote = (itemId) => {
        console.log("====>>> EVENTO DELETE", itemId);
        deleteQuotes({id:itemId})
        setTriggerBoolean(!triggerBoolean)
        console.log("====----->>> TRIGGER BOOL", triggerBoolean);

    }
    
    return(
        <div className="mainBox">
            <div className="mainBox_header  mainBox_quotes">
                <div style={!cssTrigger?{display:"none"}:{display:"block"}}>
                    <h1>Your session has expired, please login again</h1>
                    <button onClick={goingBackHome}>Home</button>
                </div>
                <div className="ulBox" style={cssTrigger?{visibility:"hidden"}:{visibility:"visible"}}>
                    <form onSubmit={inputSubmit}>
                        <textarea className="textBox" onChange={inputUserQuote} value={userQuote}></textarea>
                        <br/>
                        <br/>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                    <ul>
                        {listQuotes.map((quote) => (
                        <div className="ulBox_delete-list">
                            <button onClick={()=>deleteQuote(quote.id)} className="material-symbols-outlined ulBox_button">Delete</button>
                            <li className="ulBox_div" key={quote.id}>{
                                quote.content                               
                            }</li>
                        </div>
                        
                        ))}
                    </ul>
                    <button className="button_logout" onClick={loggingOut}>Logout</button>
                </div>
            </div>
        </div>
        
    )
}

export { Quotes }
