import { connect, closeDatabase} from "./mongoDB_test/database_test.js";
import { serverTest } from "./server/server_test.js";
import { toStartWithFunction } from "./customTests/googleUrl.js";

describe("Authentication testing", () => {

    serverTest.app
    let server = serverTest.server;
    let api = serverTest.api;

    beforeAll(async() => {
        connect()
    }, 10000);

    afterAll(async () => {
      closeDatabase()
      server.close()
    });

    test("POST /auth/google", async () => {
        toStartWithFunction()
        const getGoogleURL = await api
          .post("/auth/google")

          expect(getGoogleURL.text).toBeDefined()
          expect(typeof getGoogleURL.text).toBe("string")
          expect(getGoogleURL.text).toStartWith("https://accounts.google.com/o/oauth2/v2/auth?") 
        
      })

    test("POST /auth/google", async () => {
      toStartWithFunction()
      const getGoogleResponse = await api
        .get("/auth/google")

        console.log("GOOGLE >>>>>RESPONSE<<<<< TEST", getGoogleResponse.text)        
      })
  })