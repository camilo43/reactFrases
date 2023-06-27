import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from '../backend/utils/config.js'
import { logger } from './utils/logger.js'
import { SignUp_router } from './controllers/signUp_controller.js'
import { Quotes_router } from './controllers/quotes_controller.js'
import { Login_router } from './controllers/login_controller.js'

import cookieParser from 'cookie-parser'

mongoose.set('strictQuery', false)

const app = express()

// app.use(cors())
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Credentials', 'true'); // Habilitar las credenciales
next()
})

app.use(cookieParser())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)
  .then(()=> logger.info("// Connected to mongoDB el servidor"))
  .catch((error)=> logger.error("* Error connecting mongoDB", error.message))

app.use("/", SignUp_router)
app.use("/api/quotes", Quotes_router)
app.use("/", Login_router)
// app.use("/auth", Auth)
// app.use('/api/login', loginRouter)

export default app