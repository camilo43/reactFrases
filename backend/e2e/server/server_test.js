import createApp from "../../app.js"
import request from "supertest"

const app = createApp();

const serverTest = {
    app : app,
    server : app.listen(7000),
    api : request(app)
}

export { serverTest }
   