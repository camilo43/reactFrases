import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js";
import { Quotes } from "../src/components/Quotes.jsx"
import "./styles.css"
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>
)

