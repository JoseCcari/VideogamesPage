/* eslint-disable import/no-extraneous-dependencies */

const supertest = require("supertest");
const session = require("supertest-session");

const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
};

describe("GET /genres", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/genres")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("GET /videogame/:ID", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/videogame/11")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
describe("GET /videogames?name=", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/videogames?name=cars")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("GET /wrong page", function () {
  it("it should has status code 404", function (done) {
    supertest(app)
      .get("/genr")
      .expect(404)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
