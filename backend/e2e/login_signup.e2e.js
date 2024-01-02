import { connect, closeDatabase} from "./mongoDB_test/database_test.js";
import { SignUp_modelo_test } from "../models/signUp.js";
import { serverTest } from "./server/server_test.js";

describe("App testing", () => {
   
    serverTest.app
    let server = serverTest.server;
    let api = serverTest.api;
    
    beforeAll(async() => {
        connect()
        // dataUser = new SignUp_modelo_test({
        //   userName: 'test',
        //   email: 'mail@testmail.com',
        //   password: 'password',
        // });
       
        // dataUser.save()

        // console.log("DATABASE DATA ------->>>", await SignUp_modelo_test.find({}))
    }, 10000);

    afterAll(async () => {
      await SignUp_modelo_test.deleteOne({ email: 'mail@testmail.com' })
      closeDatabase()
      server.close()
    });

    test("The server is running", async () => {      
      expect(server).toBeTruthy
    })

    // test("The testing database connects properly", async () => {
    //   const testingConnection = connect()
    //   expect(testingConnection).toBeTruthy
    // })

    test("GET /signup", async () => {
      const userData = {
              userName:'userTest',
              email: 'mail@testmail.com',
              password: 'password',
            };
        const response = await api
            .post("/signup")
            .send(userData)
            

        expect(response).toBeTruthy
        // console.log("THIS IS POST SINGUP STATUS", await response.status)
        // console.log("THIS IS POST SINGUP BODY", await response.body)
    })

    test('Successful login', async () => {
      const userData = {
        email: 'mail@testmail.com',
        password: 'password',
      };
        const response = await api
          .post('/login')
          .send(userData)
          .expect(200)
        
        expect(response.text).toBe('COOKIE sent');
    }, 20000);

    test('Unsuccessful login', async () => {
        const userData = {
          email: 'failMail@testmail.com',
          password: 'failedPassword',
        };
        const response = await api
          .post('/login')
          .send(userData)
          .expect(422);    
        expect(response.notFound)
    });
   
})


