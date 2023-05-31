import app from './app.js' 
import cors from 'cors'
import config from './utils/config.js'
import { logger } from './utils/logger.js'
import https from 'https';

app.use(cors())

https
  .createServer(app)
  .listen(config.PORT, () => {
      logger.info(`SERVER running on port ${config.PORT}`)});

//   server.listen(config.PORT, () => {
//   logger.info(`SERVER running on port ${config.PORT}`)
// })