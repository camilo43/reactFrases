import express from "express"
import mongoose from "mongoose"
import { Quote_modelo_test } from "../models/quote.js"
import { SignUp_modelo_test } from "../models/signUp.js"
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
  // await SignUp_model.deleteOne({id:"652b6518c15b387972e66b33"})
    try{
      jwt.verify(tokenCookie, process.env.KEY, async (err, decodedToken) => {
        if(err){
          res.clearCookie('token')
          res.status(400).send("Expired token")
        }else{
            const modelSignUp = await SignUp_modelo_test.findOne({email:decodedToken.email}) 
            const modelQuotes = await Quote_modelo_test.find({})
            const listQuotes = modelSignUp.quotes
            console.log("LIST QUOTES", listQuotes)
            console.log("MODEL QUOTES", modelQuotes)
            const modelExample2 = await SignUp_modelo_test.findOne({email:decodedToken.email}).populate("quotes") 
            const modelExample3 = await Quote_modelo_test.findOne({content:"e"}).populate("user")
            
              if(!listQuotes){
                res.status(200).json("")
              }else{               
                const mapQuotes = await Promise.all(listQuotes.map((e)=>{
                  const mappedQuotes =  Quote_modelo_test.findById(e.toString()) 
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

Quotes_router.post("/", async(req, res) => {
  const tokenCookie = req.cookies.token
  try{
    const body = await req.body 
    const newPost = await Quote_modelo_test({content:body.content})
    console.log("NEW POST CONTENT", newPost)
    if(newPost){
      jwt.verify(tokenCookie, process.env.KEY, async (err, decodedToken) => {
        if(err){
          res.clearCookie('token')
          res.status(400).send("Expired token")
        }else{
          // const modelExample = await SignUp_modelo_test.findOne({email:decodedToken.email}).populate("populateQuotes").exec()
          const modelSignUp = await SignUp_modelo_test.findOne({email:decodedToken.email}).populate("quotes").exec()
          const modelQuotes = await Quote_modelo_test.find({})
          modelSignUp.quotes.push(newPost._id)
          await modelSignUp.save()
          await newPost.save()
          console.log("MODEL QUOTES", modelQuotes)
          res.status(200).json(modelSignUp)
        } 
      }
    )}  
    
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
        res.clearCookie('token')
        res.status(400).send("Expired token")
      }else{
        await SignUp_modelo_test.updateOne({quotes: itemId}, {$pull:{quotes: itemId}})
        await Quote_modelo_test.deleteOne({_id:itemId})
        const modelExample = await SignUp_modelo_test.findOne({email:decodedToken.email}) 
        const listQuotes = modelExample.quotes           
        if(!listQuotes){
          res.status(200).json("")
        }else{
          
          const mapQuotes = await Promise.all(listQuotes.map((e)=>{
            const mappedQuotes =  Quote_modelo_test.findById(e.toString())                 
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