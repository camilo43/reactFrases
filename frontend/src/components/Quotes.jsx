import { useState, useEffect } from "react";
import { quotesInput, quotesGet, deleteQuotes } from "../axios/quotesAxios";
import { useNavigate } from "react-router-dom"

function Quotes () {
    const [userQuote, setUserQuote] = useState("")
    let [listQuotes, setListQuotes] = useState([])
    const [updatedList, setUpdatedList] = useState([])
    const [triggerBoolean, setTriggerBoolean] = useState(false)
    const [cssTrigger, setCssTrigger] = useState(false)
    const [emptyMessageCss, setEmptyMessageCss] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
              const quotes = await quotesGet();
              setListQuotes(quotes);
            }catch (error) {
                setCssTrigger(true)
                console.error("There was an error while trying to get the information");
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
        
    const inputUserQuote = (event) => {
        const userInput = event.target.value
        setUserQuote(userInput);
       
    }
   
    const goingBackHome = () => {
        navigate("/")
    }

    const loggingOut = () => {
        navigate("/api/quotes/user/logout")
    }

    const deleteQuote = async (itemId) => {
        try{
            const newUpdatedList = await deleteQuotes({id:itemId})
            setUpdatedList(newUpdatedList.reverse())
        }catch(error){
            console.log("There was a problem while deleting the note")
        }
    }
    // const MappingList = () => {
    //     return listQuotes.map((quote,index) => {
    //         return(
    //         <div className="ulBox_delete-list"  key={quote.id}>
    //             <button onClick={()=> {deleteQuote(quote.id); setTriggerBoolean(!triggerBoolean); setListQuotes(updatedList)}} className="material-symbols-outlined ulBox_button">Delete</button>
               
    //             <li className="ulBox_div">{
    //                 quote.content                
    //             }</li> 
    //         </div>
    //     )}) 
    // }

    const handleDelete = (index, id) => {        
        const updatedItems = listQuotes.filter((_, i) => i !== index);
        console.log("=====>>>> =====>>>>", updatedItems)
        setListQuotes(updatedItems);
        deleteQuote(id)
        return updatedItems
      };

     const MappingList = () => {
        return listQuotes.map((quote,index) => {
            return(
            <div className="ulBox_delete-list"  key={quote.id}>
                <li className="ulBox_div">
                    <button onClick={()=> {handleDelete(index, quote.id)}} className="material-symbols-outlined">Delete</button>
                {quote.content }</li> 
            </div>
        )}) 
    }

    return(
        <div className="mainBox">
            <div className="mainBox_header  mainBox_quotes">
                <div style={!emptyMessageCss?{display:"none"}:{display:"block"}}>
                    <h2>The input can not be a blank space</h2>
                </div>
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
                        <MappingList/>
                    </ul>
                    <button className="button_logout" onClick={loggingOut}>Logout</button>
                </div>
            </div>
        </div>
        
    )
}

export { Quotes }
