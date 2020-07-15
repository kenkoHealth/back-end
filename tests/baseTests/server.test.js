// Basic server test
const request = require("supertest");
const server = require("../../server");

describe("Server", () => {
  it("Runs a basic server test", () => {
    expect(true).toBe(true);
  });
  it("Hits main endpoint correctly", () => {
    return request(server)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  it("Returns the correct message upon being hit", () => {
    return request(server)
      .get("/")
      .then((res) => {
        expect(res.body).toEqual({ Message: "Server is up and running!" });
      });
  });
});
