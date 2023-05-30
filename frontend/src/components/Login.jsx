import { React, useState } from "react"

function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailOnChange = (event) => {
        setEmail(event.target.value)
        console.log(">>email", email);
    }

    const passwordOnChange = (event) => {
        setPassword(event.target.value)
        console.log(">>password", password);
    }
    return(<div>            
            <form>
                <label>Email</label>
                <input type="email"></input>
                <br></br>
                <br></br>
                <label>Password</label>
                <input type="password"></input>
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
       
    )
}

export { Login }