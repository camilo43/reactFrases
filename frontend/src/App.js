import React from "react"
import { Signup } from "./components/Signup.jsx"
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import { PagEjemplo } from "./components/PagEjemplo.jsx";
import { Auth } from "./components/Auth.jsx"

function App() {
    return(
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Signup/>}></Route>
       <Route path="/api/pagejemplo" element={<PagEjemplo/>}></Route>
       <Route path="/auth" element={<Auth/>}></Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App  
