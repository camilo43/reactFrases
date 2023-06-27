import { SignUp_model } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const Login_router = express.Router()

Login_router.post("/login", async(req, res, next) => {
    const dataUser = await req.body
    const userEmail = dataUser.email    
    const userPassword = dataUser.password
    const user = await SignUp_model.findOne({email:userEmail})
   
    function tokenExpiration(){
        console.log(("PASO 0: ENTRA A FUNCT"));
        const signed = jwt.sign({email:userEmail}, process.env.KEY, {expiresIn:"50m"})
        return signed
    }
    if(user){
        console.log(("PASO 1: ENTRA A USER"));
        if(bcrypt.compareSync(userPassword,user.password)){
            console.log(("PASO 2: ENTRA A BCRY"));
            const signedCondition = tokenExpiration()
            console.log(">>>>>>SIGNED check data", signedCondition==true)
            res.cookie("token", signedCondition, {
                SameSite: 'none',
                secure: true}
            ).status(200).send("COOKIE sent")
        }
    } else{
        console.log(("PASO 3: ENTRA A error"));
        console.log("ERROR EN EL BACKEND-----Login");
        res.status(400).send("THE USER WAS NOT FOUND, PLEASE SIGN IN")
    }
})

export { Login_router }