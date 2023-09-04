import { useEffect, useState } from "react";
import { postUserInput_login } from "../axios/loginAxios"
import { Quotes } from "./Quotes"
import { useNavigate } from "react-router-dom";
import { getUserAuthenticated } from "../axios/postAxios.js";

function Authenticated() {
    const navigate = useNavigate();
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ userNameWelcome, setUserNameWelcome ] = useState("")
  
    useEffect(() => {
      const fetchData = async () => {
        const pruebaFunc = await getUserAuthenticated();
        console.log("GET USER AUTHENTICATED====+++>>>", pruebaFunc)
        console.log("GET USER AUTHENTICATED====+++>>>", pruebaFunc==true)
        pruebaFunc? setIsAuthenticated(true) : setIsAuthenticated(false);
        setUserNameWelcome(pruebaFunc.userName)       
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
        console.log("IS IT AUTHENTICATED", isAuthenticated);
      if (isAuthenticated) {
        const timer = setTimeout(() => {
          navigate("/api/quotes");
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    }, [isAuthenticated, navigate]);
  
    const goingBackHome = () => {
        navigate("/")
    }

    if (isAuthenticated) {
      return (
        <div className="mainBox">
          <h1 className="mainBox_header">WELCOME {userNameWelcome}!</h1>
        </div>
      );
    } else {
        <div className="mainBox">
          <div className="mainBox_header">
            <h1>THE USER COULD NOT BE AUTHENTICATED</h1>
            <button onClick={goingBackHome}>Home</button>
          </div>
        </div> 
      
    }
  }
  
  export { Authenticated };