import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from '../backend/utils/config.js'
import { logger } from './utils/logger.js'
import { SignUp_router } from './controllers/signUp_controller.js'
import { PagEjemplo_router } from './controllers/pagEjemplo.js'
import cookieParser from 'cookie-parser'

mongoose.set('strictQuery', false)

const app = express()

app.use(cors());
app.use(cookieParser())
//app.use(cors())
app.use(express.json())


mongoose.connect(config.MONGODB_URI)
  .then(()=> logger.info("// Connected to mongoDB"))
  .catch((error)=> logger.error("* Error connecting mongoDB", error.message))

app.use("/", SignUp_router)
app.use("/api/pagejemplo", PagEjemplo_router)

// app.use('/api/login', loginRouter)

export default app