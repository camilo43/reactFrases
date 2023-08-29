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
   
    function tokenExpiration(){
        console.log("---->>> dataUser", dataUser);
        const signed = jwt.sign({email:userEmail}, process.env.KEY, {expiresIn:"30m"})
        console.log("===============------777777------================")
        console.log("=====> SIGNED LO QUE ES", signed);
        console.log("DATA USER", dataUser);
        console.log("7777====>>>> USER", user==true?true:false);
        return signed
    }
    

    if(user){
        if(bcrypt.compareSync(userPassword,user.password)){       
            console.log("THIS IS THE ENTRANCE OF COOKIES")    
            const signedCondition = tokenExpiration()
            res.cookie("token", signedCondition, {
                SameSite: 'none',
                secure: true}
            ).status(200).send("COOKIE sent")
        }
    } else{
        res.status(400).send("THE USER WAS NOT FOUND, PLEASE SIGN IN")
    }
})

export { Login_router }