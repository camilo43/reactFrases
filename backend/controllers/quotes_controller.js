import express from "express"
import { Quote_model } from "../models/quote.js"
import { SignUp_model } from "../models/signUp.js"
import jwt from 'jsonwebtoken'

const Quotes_router = express.Router()
Quotes_router.get("/user/logout", async(req, res) => {
      res.clearCookie('token')
      res.status(200).send("LoggedOut")
})

Quotes_router.get("/", async(req, res) => {
  const tokenCookie = req.cookies.token
  jwt.verify(tokenCookie, process.env.KEY, async (err, decodedToken) => {
    if(err){
      res.clearCookie('token')
      res.status(400).send("Expired token")
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
          res.status(400).send("Expired token")
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
      res.status(400).send("Expired token")
      console.log("THERE IS AN ERROR. MORE DETAILS AVAILABLE: ", error);
  }
})

Quotes_router.delete("/:itemId", async(req, res) => {
  const itemId = req.params.itemId;
  console.log("ITEM ID====>>", itemId);
  
  const tokenCookie = req.cookies.token
 
  try{
    jwt.verify(tokenCookie, process.env.KEY, async (err, decodedToken) => {
      if(err){
        console.log("The token has expired");
        res.status(400).send("Expired token")
      }else{
        const elementoId = await SignUp_model.updateOne({quotes: itemId}, {$pull:{quotes: itemId}})
        return await Quote_model.deleteOne({_id:itemId})
      }
    })
  }
  catch(error){
    console.log("Something has gone wrong =====> ", error);
  }
})

export { Quotes_router }