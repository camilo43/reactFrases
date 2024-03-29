import { SignUp_model_test } from "../models/signUp.js";
import express from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const Login_router = express.Router()

Login_router.get("/", async(req, res, next) => {
    res.status(200).send("Starting Server")
})   

Login_router.post("/login", async(req, res, next) => {
    const dataUser = await req.body
   
    const userEmail = dataUser.email   
    const userPassword = dataUser.password
    const user = await SignUp_model_test.findOne({email:userEmail})
    function tokenExpiration(){
        const signed = jwt.sign({email:userEmail}, process.env.KEY, {expiresIn:"5m"})        
        return signed
    }

    if(userEmail.match(/\S+@\S+\.com/)){        
        try{
            if(user){
                if(bcrypt.compareSync(userPassword,user.password)){  
                    const signedCondition = tokenExpiration()
                    res.cookie("token", signedCondition, {
                        httpOnly:true,
                        SameSite: 'none',
                        secure: true}
                    ).status(200).send("COOKIE sent")
                }else{
                    res.status(422).json({error:"The password is wrong"})
                }
            }else{
                res.status(422).json({error:"The user was not found. Please Sign Up"})
            } 
        } catch(error){
        console.log("Login could not be completed")
        }
    }else{
        res.status(422).json({error:"Invalid email"})
    }
   
    }
)

export { Login_router }