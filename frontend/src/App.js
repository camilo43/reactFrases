import React from "react"
import { Signup } from "./components/Signup.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from "./components/Auth.jsx"
import { MainPage } from "./components/MainPage.jsx";
import { Login } from "./components/Login.jsx";
import { Authenticated } from "./components/Authentication.jsx";
import { Quotes } from "./components/Quotes.jsx";
import { Logout } from "./components/Logout.jsx";

function App() {
    return(
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<MainPage/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/auth" element={<Auth/>}></Route>
       <Route path="/auth/autenticado" element={<Authenticated/>}></Route>
       <Route path="/api/quotes" element={<Quotes/>}></Route>
       <Route path="/api/quotes/user" element={<Quotes/>}></Route>
       <Route path="/api/quotes/user/logout" element={<Logout/>}></Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App  
