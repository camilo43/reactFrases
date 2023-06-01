import express from "express"
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const PagEjemplo_router = express.Router()

PagEjemplo_router.get("/api/pagejemplo", async(req, res) => {
    res.send({respuesta:"Logrado"})
    console.log("******>> ENTRA PagEjemplo_router");  
    // const verificado =  req.cookies
    // console.log("PRUEBA REQ",  req.cookies);
    // jwt.verify(verificado, process.env.KEY, (err, decodedToken) => {
    //     if (err) {
    //       // El token no es válido
    //       console.error('Error al verificar el token:', err);
    //     } else {
    //       // El token es válido
    //       console.log('Token verificado:', decodedToken);
    //       // Puedes acceder a los datos del token decodificado en decodedToken
    //     }
    // })

    res.status(200).json({Status:"Inside page"})
    
})

export { PagEjemplo_router }