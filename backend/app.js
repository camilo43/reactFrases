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
mongoose.set('strictPopulate', false);
// mongoose.set('debug', true)


const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
// app.use(cors({ credentials: true, origin: 'https://frontendfrases.onrender.com' }))
// app.use(cors({ credentials: true, origin: 'https://www.camilovega.site',methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}))
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' ,methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}))

// app.options('*', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.camilovega.site');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.sendStatus(200);
// });

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Origin', 'https://frontendfrases.onrender.com');
// res.setHeader('Access-Control-Allow-Origin', 'https://www.camilovega.site');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Credentials', 'true'); 
next()
})

app.use(cookieParser())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)
  .then(()=> logger.info("// Connected to mongoDB el servidor"))
  .catch((error)=> logger.error("Error connecting mongoDB", error.message, config.MONGODB_URI))

app.use("/", SignUp_router)
app.use("/api/quotes", Quotes_router)
app.use("/", Login_router)

export default app