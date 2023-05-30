import { SignUp_model } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const SignUp_router = express.Router()

SignUp_router.post("/", async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:500');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log(">>>>>>ENTRA Signup_Router");
    const dataUser = await req.body
    const toSign = {
        userName:dataUser.userName,
        email:dataUser.email
    }
    
    bcrypt.hash(dataUser.password, 10, (err, hashedPassword) => {
        if(err){
            console.error("Something has gone wrong, please try again")
            res.status(500).json({ error: "Server error" })
        }else{
            const userData_HashedPassword = {
                userName:dataUser.userName,
                email:dataUser.email,
                password:hashedPassword
            }
            const newUser = new SignUp_model(userData_HashedPassword);
            newUser.save()
            
            const token = jwt.sign(toSign, process.env.KEY, {expiresIn:900})
            const tokenBearer = `${token}`
            console.log("TOKEN BEARER", tokenBearer)
            res.cookie("tokenBearer", tokenBearer ,{
                sameSite:"none", 
                secure:true
            }).status(200).send("COOKIE sent")        
        }
    })
})

SignUp_router.get("/auth", async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log("======> ENTRA PagEjemplo_router");  
    const verificado = await req.cookies
    console.log("REQ TEST", req);
    jwt.verify(verificado, process.env.KEY, (err, decodedToken) => {
        if (err) {
          // El token no es válido
          console.error('Error al verificar el token:', err);
        } else {
          // El token es válido
          console.log('Token verificado:', decodedToken);
          // Puedes acceder a los datos del token decodificado en decodedToken
        }
    })
})
export { SignUp_router }


