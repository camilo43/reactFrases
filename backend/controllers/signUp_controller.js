import { SignUp_model } from "../models/signUp.js";
import express, { response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const { verify } = jwt

const SignUp_router = express.Router()

SignUp_router.post("/signup", async(req, res, next) => {
    const dataUser = await req.body   
    console.log("DATA_USER IN POST", dataUser);
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

            function tokenExpiration(){
                console.log("---->>> dataUser", dataUser);
                const signed = jwt.sign({email:dataUser.email}, process.env.KEY, {expiresIn:"30m"})
                console.log("=====> SIGNED LO QUE ES", signed);
                return signed
            }
                      
            const newUser = new SignUp_model(userData_HashedPassword);
            newUser.save()
            res.status(200).send(dataUser)
            //  >>>>THIS IS TO BE USED ONLY IN PRODUCTION<<<
            const signedCondition = tokenExpiration()
            res.cookie("tokenBearer", signedCondition ,{
                sameSite:"none", 
                secure:true
            })  
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
    console.log("DATA USER CHECKING AUTH", dataUser)
       
    if(dataUser){
        try{
            const token = jwt.sign(toBeSigned, process.env.KEY, {expiresIn:"30m"})           
            res.set('Content-Type', 'application/json');
            res.cookie("token", token, {
                   SameSite: 'none',
                    secure: true
            }).status(200).send("COOKIE sent") 
        }catch(error){
            res.cookie("token", "", {
                sameSite: 'none',
                secure: true,
                expires: new Date(0),
              }).status(200).send("COOKIE deleted");

            console.log(`The token could not be signed. Details of this error:${error}`)
        }
    }
})

SignUp_router.get("/auth/autenticado", async(req,res)=>{
    try{
        const verificando = req.cookies.token
        console.log("VERIFICANDO COOKIE HAPPENS", verificando)
        if(verificando){ 
            jwt.verify(verificando, process.env.KEY, async (err, decodedToken) => {
                
                if (err) {
                  console.error('An error happened while verifying the token:', err);
                } else {
                    const findingUserName = await SignUp_model.findOne({email:decodedToken.email})                    
                    console.log("======---->>> FINDING USERNAME", findingUserName);
                    res.status(200).json({response:findingUserName.userName})
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


