import { useState, useEffect } from "react";
import { quotesInput, quotesGet } from "../axios/quotesAxios";

function Quotes () {
    const [userQuote, setUserQuote] = useState("")
    const [listQuotes, setListQuotes] = useState([])
    const [triggerBoolean, setTriggerBoolean] = useState(false)

    useEffect(() => {
        console.count("ESTE ES EL COUNTING DE USE-EFFECT");
        const fetchData = async () => {
            try {
              const quotes = await quotesGet();
              setListQuotes(quotes);
            } catch (error) {
              console.error("Error al obtener la información:", error);
            }
          };
          fetchData();
    }, [triggerBoolean]);

    const quoteModel = {
        content:userQuote
    }

    console.log('USER QUOTE====>', userQuote);
    console.log('TRIGGER BOOLEAN=======>', triggerBoolean);

    const inputSubmit = (event) => {
        event.preventDefault()
        quotesInput(quoteModel)
        if(userQuote){
            setTriggerBoolean(true)
        }
    }

    const inputUserQuote = (event) => {
        setUserQuote(event.target.value);
    }
    
    return(
        <div>
            <form onSubmit={inputSubmit}>
                <input type="text" onChange={inputUserQuote}>
                </input>
                <button type="submit">
                    Submit
                </button>
            </form>
            <ul>
                {listQuotes.map((quote) => (
                <li key={quote.id}>{quote.content}</li>
                ))}
            </ul>
        </div>
    )
}

export { Quotes }
