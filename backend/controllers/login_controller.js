import { SignUp_modelo_test } from "../models/signUp.js";
import express from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const Login_router = express.Router()

Login_router.get("/", async(req, res, next) => {
    res.status(200).send("Starting Server")
})   

Login_router.post("/login", async(req, res, next) => {
    console.time("Login Inicia")
    const dataUser = await req.body
    const userEmail = dataUser.email   
    const userPassword = dataUser.password
    const user = await SignUp_modelo_test.findOne({email:userEmail})
   
    function tokenExpiration(){
        const signed = jwt.sign({email:userEmail}, process.env.KEY, {expiresIn:"30m"})        
        return signed
    }
    try{
        if(user){
            if(bcrypt.compareSync(userPassword,user.password)){  
                const signedCondition = tokenExpiration()
                res.cookie("token", signedCondition, {
                    httpOnly:true,
                    SameSite: 'none',
                    secure: true}
                ).status(200).send("COOKIE sent")
            }
        } else{
            res.status(400).send("THE USER WAS NOT FOUND, PLEASE SIGN IN")
        }
    } catch(error){
        console.log("Login could not be completed")
    }
    console.timeEnd("Login Inicia")
})

export { Login_router }