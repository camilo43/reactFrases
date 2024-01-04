import createApp from './app.js' 
import dotenv from "dotenv"
// import cors from 'cors'
// import config from './utils/config.js'
// import { logger } from './utils/logger.js'
// import https from 'https';

dotenv.config()
const app = createApp()

// app.listen(10000, () => {
//   console.log('Servidor iniciado en el puerto 10000');
// });

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});

// app.listen(3002, () => {
//   console.log('Servidor iniciado en el puerto 3002');
// });

//   server.listen(config.PORT, () => {
//   logger.info(`SERVER running on port ${config.PORT}`)
// })