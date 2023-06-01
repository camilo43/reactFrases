import express, { response } from "express"

const Auth = express.Router()

Auth.get("/auth", async(req, res) => {
    console.log("======> Signup_Router.get /AUTH");  
    const verificado = await req.cookies
    console.log("REQ TEST", req);
    jwt.verify(verificado, process.env.KEY, (err, decodedToken) => {
        if (err) {
          // El token no es válido
          console.error('Error al verificar el token:', err);
        } else {
          // El token es válido
          console.log('Token verificado:', decodedToken);
          // Puedes acceder a los datos del token decodificado en decodedToken
          res.status(200).json({token: "accepted"})
        }
    })
})

export { Auth }