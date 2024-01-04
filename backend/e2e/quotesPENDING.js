import { connect, closeDatabase} from "./mongoDB_test/database_test.js";
import { serverTest } from "./server/server_test.js";
import { toStartWithFunction } from "./customTests/googleUrl.js";

describe("Quotes testing", () => {
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

    // test("POST /api/quotes", async () => {
    //     toStartWithFunction()
    //     const body = {content: "THIS IS A TEST"}
    //     const postingQuote = await api
    //       .post("/api/quotes")

    //       console.log("QUOTES POST CHECK>>>>", postingQuote)
    //   })
})