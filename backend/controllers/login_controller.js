import { SignUp_model } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const Login_router = express.Router()

Login_router.post("/login", async(req, res, next) => {
    const dataUser = await req.body
    const userEmail = dataUser.email
    const userName = dataUser.userName    
    const userPassword = dataUser.password
    const user = await SignUp_model.findOne({email:userEmail})
    console.log("SIGNUP MODEL login_controller", user)
   
    function tokenExpiration(){
        const signed = jwt.sign({email:userEmail}, process.env.KEY, {expiresIn:"30m"})        
        return signed
    }
    if(user){
        if(bcrypt.compareSync(userPassword,user.password)){       
            console.log("THIS IS THE ENTRANCE OF COOKIES")    
            const signedCondition = tokenExpiration()
            const galleta = res.cookie("token", signedCondition, {
                SameSite: 'none',
                secure: true}
            ).status(200).send("COOKIE sent")
           console.log("ESTA ES LA GALLETA>>", galleta)
            return galleta
        }
    } else{
        res.status(400).send("THE USER WAS NOT FOUND, PLEASE SIGN IN")
    }
})

export { Login_router }