const request = require("supertest");
const app = require("../app");

describe("api server", () => {
  let api;

  beforeAll(() => {
    api = app.listen(5001, () => {
      console.log("Test server running on port 5001");
    });
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  test("it responds to get / with status 200", (done) => {
    request(api).get("/").expect(200, done);
  });

  test("it responds to get /cards with status 200", (done) => {
    request(api).get("/cards").expect(200, done);
  });

  test("it responds to get /cards/search/{name} with status 200", (done) => {
    request(api).get("/cards/search/boromir").expect(200, done);
  });

  test("it responds to incorrect get /cards/search/harry with status 404", (done) => {
    request(api).get("/cards/search/harry").expect(404, done);
  });

  test("it responds to get /cards/id/{id} with status 200", (done) => {
    request(api).get("/cards/id/1").expect(200, done);
  });

  test("it responds to incorrect get /cards/id/800 with status 404", (done) => {
    request(api).get("/cards/id/800").expect(404, done);
  });
});
