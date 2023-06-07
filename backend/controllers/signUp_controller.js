import { SignUp_model } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const SignUp_router = express.Router()

SignUp_router.post("/", async(req, res, next) => {
    const dataUser = await req.body   
    //console.log("DATA_USER IN POST", dataUser);
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
            res.status(200).send({post: "completed"})
            //  >>>>THIS IS TO BE USED ONLY IN PRODUCTION<<<
            // res.cookie("tokenBearer", tokenBearer ,{
            //     sameSite:"none", 
            //     secure:true
            // }   
                   
        }
    })
})

SignUp_router.post("/auth", async(req, res) => {
   
    //............THATS HOW A COOKIE HAS TO BE STRUCTURED WHEN SENT....................
    // res.cookie(">>>My example number 2", {
    //    SameSite: 'none',
    //     secure: true
    //   })
    //...................................................................................
    const dataUser = await req.body
    console.log("DATA USER IN GET", dataUser);
    // const token = jwt.sign({userName:"PEPE CODORNICA"}, process.env.KEY, {expiresIn:"50m"})
    // res.cookie("tokenBearer", token, {
    //        SameSite: 'none',
    //         secure: true
    //       }).status(200).send("COOKIE sent") 
    res.status(200).send("COOKIE sent") 
})

SignUp_router.get("/auth/autenticado", async(req,res)=>{
    // const verificando = req.cookies.tokenBearer
    // console.log("VERIFICANDO COOKIES", verificando);
    // return jwt.verify(verificando, process.env.KEY, (err, decodedToken) => {
    //     if (err) {
    //       // El token no es válido
    //       console.error('Error al verificar el token:', err);
    //     } else {
    //       // El token es válido
    //       console.log('Token verificado:', decodedToken);
    //       // Puedes acceder a los datos del token decodificado en decodedToken
          res.status(200).json({response: "THE USER HAS BEEN AUTHENTICATED"})
        // }
    // })
})

export { SignUp_router }


