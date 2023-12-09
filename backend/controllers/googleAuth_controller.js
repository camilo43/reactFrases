import express from "express"
import querystring from "query-string"
import jwt from "jsonwebtoken"
import axios from "axios"

const Google_authentication = express.Router()
const Google_token = express.Router()

function getGoogleAuthURL(){
    const options = {
        redirect_uri:process.env.GOOGLE_REDIRECT_PROD,
        client_id: process.env.GOOGLE_ID_CLIENT,
        access_type:"offline",
        response_type:"code",
        prompt:"consent",
        scope:[
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    }
    return(`${process.env.GOOGLE_AUTH}?${querystring.stringify(options)}`)
}

Google_authentication.post("/", async(req, res, next) => {
    return res.send(getGoogleAuthURL())
}
)

//-------------PRUEBA GOOGLE TOKENS -------- *** ** *** **

Google_token.get('/auth/google', async (req, res) => {
    const code = req.query.code;

    const getTokens = async () => {
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: process.env.GOOGLE_ID_CLIENT,
            client_secret: process.env.GOOGLE_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_PROD,
            grant_type: "authorization_code"
        }
            return await axios.post(url, querystring.stringify(values), {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                })
                .then((res) => {return res.data})
                .catch((error) => {
                  console.error(`Failed to fetch auth tokens`);
                  throw new Error(error.message);
                });
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
            .then((res) => res.data)
            .catch((error) => {
              console.error(`Failed to fetch user`);
              throw new Error(error.message);
            });
        
        const token = jwt.sign(googleUser, process.env.KEY);

            res.cookie("token", token, {
              maxAge: 900000,
              httpOnly: true,
              secure: false,
            });
         
        if(token){
            try {
                console.log("Entra a TOKEN")
                const decoded = jwt.verify(req.cookies["token"], process.env.KEY);
                console.log("decoded", decoded);
                if(decoded){
                    //res.redirect("http://localhost:3000/auth")
                    res.redirect("https://www.camilovega.site/auth")
                }else{
                    console.error("There is a problem with the authentication. Ref: token not valid")
                }
                
              } catch (err) {
                console.log(err);
                res.send(null);
              }
        }
        });
   
  

export { Google_authentication, Google_token }

