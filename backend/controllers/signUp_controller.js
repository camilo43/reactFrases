import { SignUp_model } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const SignUp_router = express.Router()

SignUp_router.post("/", async(req, res) => {
    res.header("Access-Control-Allow-Origin", "https://backendfrases.onrender.com/auth");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("RENDERIZADO 1");
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
            
            const token = jwt.sign(toSign, process.env.KEY, {expiresIn:"30m"})
            const tokenBearer = `${token}`
            console.log(".....TOKEN BEARER", tokenBearer)
            return res.cookie("tokenBearer", tokenBearer).status(200).send("COOKIE sent") 
          
            //  >>>>THIS IS TO BE USED ONLY IN PRODUCTION<<<
            // res.cookie("tokenBearer", tokenBearer ,{
            //     sameSite:"none", 
            //     secure:true
            // }   
                   
        }
    })
})

SignUp_router.get("/auth", async(req, res) => {
    res.header("Access-Control-Allow-Origin", "https://backendfrases.onrender.com/auth");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("======> RENDERIZADO 2");  
    //const verificado = await req.cookies.tokenBearer 
    const verificado = req.cookies.tokenBearer
    console.log("REQ TEST", verificado);
    res.status(200).send({token:"Entregado"})
    // return jwt.verify(verificado, process.env.KEY, (err, decodedToken) => {
    //     if (err) {
    //       // El token no es válido
    //       console.error('Error al verificar el token:', err);
    //     } else {
    //       // El token es válido
    //       console.log('Token verificado:', decodedToken);
    //       // Puedes acceder a los datos del token decodificado en decodedToken
    //       res.status(200).json({token: "accepted"})
    //     }
    // })
})

export { SignUp_router }


