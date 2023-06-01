import app from './app.js' 
import cors from 'cors'
import config from './utils/config.js'
import { logger } from './utils/logger.js'
import https from 'https';

// app.use(cors())

// app.listen(3002, () => {
//   console.log('Servidor iniciado en el puerto 3002');
// });

//   server.listen(config.PORT, () => {
//   logger.info(`SERVER running on port ${config.PORT}`)
// })