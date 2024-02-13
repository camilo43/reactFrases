import {  SignUp_modelo_test } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const { verify } = jwt

const SignUp_router = express.Router()

SignUp_router.post("/signup", async(req, res, next) => {
    const dataUser = await req.body
    const findRepeatedUser = await SignUp_modelo_test.findOne({userName:dataUser.userName})
    const findRepeatedEmail = await SignUp_modelo_test.findOne({email:dataUser.email})
    
    try{
        if(!dataUser.email){
            res.status(422).json({ error: "Email requested" })
        }
        else if(!dataUser.userName){
            res.status(422).json({ error: "User name requested" })
        }
  
        else if(findRepeatedEmail){
            res.status(422).json({ error: "Repeated email" })
        }
        else if(findRepeatedUser){
            res.status(422).json({ error: "Repeated user" })
        }
        else{
            bcrypt.hash(dataUser.password, 10, async (err, hashedPassword) => {
                if(err){
                    console.error("The user could not be registered. Check SignUp_router.post('/signup...')")
                    res.status(500).json({ error: "Server error" })
                }else{
                    const userData_HashedPassword = {
                        userName:dataUser.userName,
                        email:dataUser.email,
                        password:hashedPassword
                    }
        
                    function tokenExpiration(){
                        const signed = jwt.sign({email:dataUser.email}, process.env.KEY, {expiresIn:"30m"})
                        return signed
                    }
                    
                    try{
                        const newUser = new SignUp_modelo_test(userData_HashedPassword);
                        await newUser.save()
                        
                        const signedCondition = tokenExpiration()
                        res.cookie("token", signedCondition ,{
                        httpOnly:true,
                        SameSite: 'none',
                        secure: true}
                        ).status(200).send(dataUser) 
                    }catch(e){
                        res.status(422).json({ error: "Invalid email" })
                    }                                
                }
            })
        }
    }catch(e){
        console.log("There is a problem with the data entered when signing up")    
    }    
    })

SignUp_router.post("/auth", async(req, res) => {
    const dataUser = req.body
    const toBeSigned = {
        userName:dataUser.userName,
        email:dataUser.email
    }
    
    if(dataUser){
        try{
            const token = jwt.sign(toBeSigned, process.env.KEY, {expiresIn:"5m"})           
            res.set('Content-Type', 'application/json');
            res.cookie("token", token, {
                httpOnly:true,
                SameSite: 'none',
                secure: true}
                ).json({ token: token, message: "COOKIE sent" });
            
        }catch(error){
            console.log(`The token could not be signed. Check axios.SignUp_router`)
        }
    }else{
        console.log("Data user could not be accessed. Please check SignUp_router.post('/auth(...)'")
    }
})

SignUp_router.get("/auth/autenticado", async(req,res)=>{
    try{
        const verificando = req.cookies.token

        if(verificando){ 
            jwt.verify(verificando, process.env.KEY, async (err, decodedToken) => {                
                if (err) {
                  console.error('An error happened while verifying the token: check SignUp_router');
                } else {    
                    const findingUserName = await SignUp_modelo_test.findOne({email:decodedToken.email})
                    
                    res.status(200).json(findingUserName)
                }
            })
            return verify
        }else{
            return Error
        }
    }catch(error){
        console.log("The user could not be authenticated. Please check SignUp_router.get('/auth/autenticado(...)'")
    }
})

export { SignUp_router }


