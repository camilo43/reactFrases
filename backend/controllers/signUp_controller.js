import { SignUp_model } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt, { verify } from 'jsonwebtoken'

const SignUp_router = express.Router()

SignUp_router.post("/signup", async(req, res, next) => {
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

// SignUp_router.get("/test", async(req, res) => {
//     //............THATS HOW A COOKIE HAS TO BE STRUCTURED WHEN SENT....................
//     res.cookie(">>> I KNOW THIS WORKS My COOKIE *GET", {
//        SameSite: 'none',
//         secure: true
//       }).status(200).send("COOKIE GET") 
// })

// SignUp_router.post("/testPost", async(req, res) => {
//     //............THATS HOW A COOKIE HAS TO BE STRUCTURED WHEN SENT....................
//     res.cookie(">>>My COOKIE #POST", {
//        SameSite: 'none',
//         secure: true
//       }).status(200).send("COOKIE POST") 
// })

SignUp_router.post("/auth", async(req, res) => {
    //............THATS HOW A COOKIE HAS TO BE STRUCTURED WHEN SENT....................
    // res.cookie(">>>My example number 2", {
    //    SameSite: 'none',
    //     secure: true
    //   }).status(200).send("COOKIE sent") 
    //...................................................................................
    const dataUser = req.body.params
    const toBeSigned = {
        userName:dataUser.userName,
        email:dataUser.email
    }
   
    if(dataUser){
        try{
            const token = jwt.sign(toBeSigned, process.env.KEY, {expiresIn:"50m"})           
            res.set('Content-Type', 'application/json');
            res.cookie("token", token, {
                   SameSite: 'none',
                    secure: true
            }).status(200).send("COOKIE sent") 
        }catch(error){
            console.log(`The token could not be signed. Details of this error:${error}`)
        }
    }
})

SignUp_router.get("/auth/autenticado", async(req,res)=>{
    try{
        const verificando = req.cookies.token
        
        if(verificando){ 
            jwt.verify(verificando, process.env.KEY, async (err, decodedToken) => {
                if (err) {
                  console.error('An error happened while verifying the token:', err);
                  return err
                } else {
                   
                  res.status(200).json({response: "THE USER HAS BEEN AUTHENTICATED"})
                }
            })
           
            return verify
        }else{
            return Error
        }
    }catch(error){
        console.log("THIS ERROR HAS HAPPENED IN THE BACKEND: ", error)
    }
    
})

export { SignUp_router }


