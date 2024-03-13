import express from "express"
import querystring from "query-string"
import jwt from "jsonwebtoken"
import axios from "axios"
import { SignUp_model_test } from "../models/signUp.js"

const Google_authentication = express.Router()
const Google_token = express.Router()
const urlFront= process.env.REACT_APP_URL_FRONTEND

function getGoogleAuthURL(){
    const options = {
        redirect_uri:process.env.GOOGLE_REDIRECT,
        client_id: process.env.GOOGLE_ID_CLIENT,
        access_type:"offline",
        response_type:"code",
        prompt:"consent",
        scope:[
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    }
    console.log(`${process.env.GOOGLE_AUTH}?${querystring.stringify(options)}`)
    return(`${process.env.GOOGLE_AUTH}?${querystring.stringify(options)}`)
}


Google_authentication.post("/auth/google", async(req, res, next) => {
    return res.send(getGoogleAuthURL())
}
)

//-------------PRUEBA GOOGLE TOKENS -------- *** ** *** **

Google_token.get("/auth/google", async (req, res) => {
  // await SignUp_model_test.deleteOne({email: 'cvprogramacv@gmail.com'})
  const code = req.query.code;
  const getTokens = async () => {
      const url = "https://oauth2.googleapis.com/token";
      const values = {
          code,
          client_id: process.env.GOOGLE_ID_CLIENT,
          client_secret: process.env.GOOGLE_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT,
          grant_type: "authorization_code"
      }
      
      const response = await axios.post(url, querystring.stringify(values), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
        try{
          return response.data
        }catch(error){
          console.error("Error fetching auth tokens:", error.message);
          return null;
      }
      }

      const { id_token, access_token } = await getTokens()
      const googleUser = await axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
              headers: {
                Authorization: `Bearer ${id_token}`,
              },
            }
          )           
     
      const userGoogle = new SignUp_model_test({
        userName: googleUser.data.name,
        email: googleUser.data.email,
        googleId: googleUser.data.id
      })

      const token = jwt.sign(googleUser.data, process.env.KEY);
        try{
          res.cookie("token", token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
          });
        }catch{
          console.log("SOMETHING WENT WRONG WITH THE GOOGLE TOKEN")
        } 

      if(googleUser&&token){
          try {
            const checkingRepeatedUser = await SignUp_model_test.findOne({email:googleUser.data.email})
            if(checkingRepeatedUser){
              res.redirect(`${urlFront}/auth/authenticated`)
              // res.redirect("http://localhost:3000/auth/authenticated")
               // res.redirect("https://www.camilovega.site/auth")
            }else{
              try{
                await userGoogle.save()
                res.redirect(`${urlFront}/auth/authenticated`)
                // res.redirect("http://localhost:3000/auth/authenticated")
                 // res.redirect("https://www.camilovega.site/auth")
                }
              catch(error){
                console.log("THIS IS THE ERROR GOOGLE LOGIN =====>>>> ", error)
              }
             
            }             
          } catch (err) {
            console.log(err);
            res.send(null);
          }
      }
  });

export { Google_authentication, Google_token }

