import { connect, closeDatabase} from "./mongoDB_test/database_test.js";
import { SignUp_modelo_test } from "../models/signUp.js";
import { serverTest } from "./server/server_test.js";

describe("Authentication testing", () => {
   
    serverTest.app
    let server = serverTest.server;
    let api = serverTest.api;

    beforeAll(async() => {
        connect()

        const userData = {
          userName:'userTest',
          email: 'mail@testmail.com',
          password: 'password',
        };
        await api
          .post('/signup')
          .send(userData);
    }, 10000);

    afterAll(async () => {
      await SignUp_modelo_test.deleteOne({ email: 'mail@testmail.com' })
      closeDatabase()
      server.close()
    });

    test("POST /auth", async () => {
      const getToken = await api
        .post('/auth')
      
      expect(getToken.body.token).toBeDefined()
      expect(typeof getToken.body.token).toBe("string")
    })
})