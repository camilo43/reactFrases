import { quotesGetLogOut } from "../axios/quotesAxios"
import { useNavigate } from "react-router-dom"
function Logout () {
    const navigate = useNavigate()
    quotesGetLogOut()
    setTimeout(() => {
        navigate("/")
    }, 3000);
   
    return(
        <div className="mainBox">
            <h1 className="mainBox_header">Thanks for visiting our site</h1>
        </div>
    )
}

export { Logout }