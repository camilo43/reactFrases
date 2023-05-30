import app from './app.js' // la aplicación Express real
import http from 'http'
import cors from 'cors'
import config from './utils/config.js'
import { logger } from './utils/logger.js'
import https from 'https';
import fs from 'fs';

app.use(cors())

// const server = http.createServer(app)
// ******INFORMATION REGARDING THE HTTPS CERTIFICATE*****
//The certificate is at "./localhost.pem" and the key at "./localhost-key.pem"✅
//It will expire on 29 August 2025 🗓
//TO START THE SERVER: 
// "scripts": {
//   "start":"HTTPS=true SSL_CRT_FILE={PATH/TO/CERTIFICATE-FILENAME}.pem SSL_KEY_FILE={PATH/TO/CERTIFICATE-KEY-FILENAME}.pem react-scripts start"
// }
const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};
https
  .createServer(options, app)
  .listen(config.PORT, () => {
      logger.info(`SERVER running on port ${config.PORT}`)});

//   server.listen(config.PORT, () => {
//   logger.info(`SERVER running on port ${config.PORT}`)
// })