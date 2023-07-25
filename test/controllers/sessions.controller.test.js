import { assert, expect } from "chai";
import { describe, it } from "mocha";

import { endOfUserTest, http } from "../config.test.js";

describe("Sessions controller", () => {
  describe("POST /api/sessions/register", () => {
    it("should not register a new user with incomplete/empty fields", async () => {
      const response = await http.post("/api/sessions/register").send({
        firstName: "Axel",
        lastName: "Sanchez",
        email: "",
        age: 20,
        password: "12345",
      });
      assert.equal(response.status, 400, "Status should be 400");
    });
    it("should register a new user", async () => {
      const response = await http.post("/api/sessions/register").send({
        firstName: "Axel",
        lastName: "Sanchez",
        email: "axel@mail.com",
        age: 20,
        password: "12345",
      });
      assert.equal(response.status, 200, "Status should be 200");
    });
    it("should not register a new user with an existing email", async () => {
      const response = await http.post("/api/sessions/register").send({
        firstName: "Axel",
        lastName: "Sanchez",
        email: "axel@mail.com",
        age: 20,
        password: "12345",
      });
      assert.equal(response.status, 401, "Status should be 401");
    });
  });

  describe("POST /api/sessions/login", () => {
    beforeEach(async () => {
      await endOfUserTest();
    });

    it("should login a user", async () => {
      const response = await http.post("/api/sessions/register").send({
        firstName: "Axel",
        lastName: "Sanchez",
        email: "axel@mail.com",
        age: 20,
        password: "12345",
      });

      const authToken = response.header["set-cookie"][0];

      await http.get("/api/sessions/logout");

      const loginResponse = await http
        .post("/api/sessions/login")
        .send({
          email: "axel@mail.com",
          password: "12345",
        })
        .expect(200);

      const loginCookie = loginResponse.header["set-cookie"][0];

      const expectedCookie = authToken.match(
        /connect.sid=s%3A[^;]+; Path=\/; HttpOnly/
      );
      const actualCookie = loginCookie.match(
        /connect.sid=s%3A[^;]+; Path=\/; HttpOnly/
      );

      expect(actualCookie).equal(expectedCookie);
    });
  });

  describe("GET /api/sessions/logout", () => {
    beforeEach(async () => {
      await endOfUserTest();
    });

    it("should logout a user", async () => {
      const response = await http
        .post("/api/sessions/register")
        .send({
          firstName: "Axel",
          lastName: "Sanchez",
          email: "axel@mail.com",
          age: 20,
          password: "12345",
        })
        .expect(200);

      const authToken = response.header["set-cookie"][0];

      const logoutResponse = await http.get("/api/sessions/logout");

      const loginCookie = logoutResponse.header["set-cookie"][0];

      const expectedCookie = authToken.match(
        /connect.sid=s%3A[^;]+; Path=\/; HttpOnly/
      );
      const actualCookie = loginCookie.match(
        /connect.sid=s%3A[^;]+; Path=\/; HttpOnly/
      );

      expect(actualCookie).equal(expectedCookie);
    });
  });
});
