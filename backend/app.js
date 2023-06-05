import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from '../backend/utils/config.js'
import { logger } from './utils/logger.js'
import { SignUp_router } from './controllers/signUp_controller.js'
import { PagEjemplo_router } from './controllers/pagEjemplo.js'
import { Auth } from './controllers/auth.js'
import cookieParser from 'cookie-parser'

mongoose.set('strictQuery', false)

const app = express()
//app.use(cors())
const corsOptions = {
  origin: '*', // Cambia '*' por el dominio o dominios permitidos
  methods: 'GET, POST, PUT, DELETE', // Métodos HTTP permitidos
  allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
};
// Aplicar middleware CORS a todas las rutas
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)
  .then(()=> logger.info("// Connected to mongoDB el servidor"))
  .catch((error)=> logger.error("* Error connecting mongoDB", error.message))

app.use("/", SignUp_router)
app.use("/api/pagejemplo", PagEjemplo_router)
// app.use("/auth", Auth)

// app.use('/api/login', loginRouter)

export default app