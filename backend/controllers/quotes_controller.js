import express from "express"
import { Quote_model } from "../models/quote.js"
import { SignUp_model } from "../models/signUp.js"
import jwt from 'jsonwebtoken'


const Quotes_router = express.Router()
// app.use("/api/quotes", Quotes_router)

Quotes_router.get("/", async(req, res) => {
  const tokenCookie = req.cookies.token
  jwt.verify(tokenCookie, process.env.KEY, async (err, decodedToken) => {
    if(err){
      console.log("The token was not verified", err);
    }else{
        const modelExample = await SignUp_model.findOne({email:decodedToken.email})        
        const listQuotes = modelExample.quotes
          if(!listQuotes){
            res.status(200).json("")
          }else{
            const mapQuotes = await Promise.all(listQuotes.map((e)=>{
            const mappedQuotes = Quote_model.findById(e.toString())
            return mappedQuotes
          }))
        console.log("============================777", mapQuotes );
        res.status(200).json(mapQuotes)
      }}})
    }
)

Quotes_router.post("/user", async(req, res) => {
  const tokenCookie = req.cookies.token
  try{
    const body = await req.body 
    const newPost = await Quote_model({content:body.content})
    newPost.save()
    
    if(newPost){
      jwt.verify(tokenCookie, process.env.KEY, async (err, decodedToken) => {
        if(err){
          console.log("The token was not verified", err);
        }else{
            const modelExample = await SignUp_model.findOne({email:decodedToken.email}).populate("quotes").exec();
            modelExample.quotes.push(newPost._id)
            await modelExample.save()
          
          // const modelExample = await SignUp_model.findOne({email:decodedToken.email}).populate("quotes") 
          // modelExample.quotes.push(newPost._id)
          // await modelExample.save()
         
          //=========DO NOT DELETE THE NEXT LINE =======
         // modelExample.quotes.push(newPost._id)
        
         //await modelExample.save()
          
          //============================================
          // const userIdString = userId[0]._id
          // newPost.user = newPost.user.concat(userIdString) 
          res.status(200).json(modelExample)
        }
      })
    }    
    
  }catch(error){
      console.log("THERE IS AN ERROR. MORE DETAILS AVAILABLE: ", error);
  }
})

export { Quotes_router }