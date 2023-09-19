import express from "express"
import { Quote_model } from "../models/quote.js"
import { SignUp_model } from "../models/signUp.js"
import jwt from 'jsonwebtoken'

const Quotes_router = express.Router()
 
    Quotes_router.get("/user/logout", async(req, res) => {
      try{
        res.clearCookie('token')
        res.status(200).send("LoggedOut")
      }catch(error){
        console.log("Logout process could not be completed", error)
    }
  })

Quotes_router.get("/", async(req, res) => {
  const tokenCookie = req.cookies.token
  //await SignUp_model.deleteOne({id:"64f3f66bfd3c1fed6bdbd22d"})
    try{
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
                  const mappedQuotes =  Quote_model.findById(e.toString())                 
                  return mappedQuotes
              }))
            res.status(200).json(mapQuotes)
          }
        }
      })
    }catch(error){
    console.log("There was a problem when sending user's data", error)
  }
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
          res.status(200).json(modelExample)
        }
      })
    }
  }catch(error){
      console.log("There was an error when getting the account info. More details:", error);
  }
})

Quotes_router.delete("/:itemId", async(req, res) => {
  const itemId = req.params.itemId;  
  const tokenCookie = req.cookies.token
  
  try{
    jwt.verify(tokenCookie, process.env.KEY, async (err, decodedToken) => {
      
      if(err){
        console.log("The token has expired");
        res.status(400).send("Expired token")
      }else{
        await SignUp_model.updateOne({quotes: itemId}, {$pull:{quotes: itemId}})
        await Quote_model.deleteOne({_id:itemId})
        const modelExample = await SignUp_model.findOne({email:decodedToken.email}) 
        const listQuotes = modelExample.quotes           
        if(!listQuotes){
          res.status(200).json("")
        }else{
          const mapQuotes = await Promise.all(listQuotes.map((e)=>{
            const mappedQuotes =  Quote_model.findById(e.toString())                 
            return mappedQuotes
          }))
      res.status(200).json(mapQuotes)          
      }
    }})
  }
  catch(error){
    console.log("The item selected could not be deleted", error);
  }
})

export { Quotes_router }