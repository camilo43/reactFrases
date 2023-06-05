import express from "express"
import jwt from 'jsonwebtoken'
const Auth = express.Router()

Auth.get("/", async(req, res) => {
    // console.log("======> Signup_Router.get /AUTH");  
    // const verificado = await req.cookies
    // console.log("REQ TEST VERIFICADO::::", verificado);
    // try{
    //     const verificando = jwt.verify(verificado, process.env.KEY, (err, decodedToken) => {
    //       console.log("TYPE OF VERIFY", typeof verificando);
    //         if (err) {
    //           // El token no es válido
    //           console.error('Error al verificar el token:', err);
    //         } else {
    //           // El token es válido
    //           //console.log('Token verificado:', decodedToken);
    //           // Puedes acceder a los datos del token decodificado en decodedToken
    //           res.status(200).json({token: "accepted"})
    //         }
    //     })
    //     console.log("VERIFICANDOOOOOO>>>> VERIFICANDO TOKEN", verificando);
    // }catch (error){
    //     console.log("There is a problem with the Auth request")
    // }
})

export { Auth }