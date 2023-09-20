import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAuthenticated } from "../axios/postAxios.js";

function Authenticated() {
    const navigate = useNavigate();
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ userNameWelcome, setUserNameWelcome ] = useState("")
  
    useEffect(() => {
      const fetchData = async () => {
        const pruebaFunc = await getUserAuthenticated();
        pruebaFunc? setIsAuthenticated(true) : setIsAuthenticated(false);
        setUserNameWelcome(pruebaFunc.userName)       
      };
      fetchData();
    }, []);
  
    useEffect(() => {
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