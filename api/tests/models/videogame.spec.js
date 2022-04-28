const { Videogame, Genre, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Videogame.create({ name: "Emmanuel" });
      });
      it("should return name not found", (done) => {
        Videogame.findAll()
          .then((r) => expect(r[1].name).to.be.false("NameNotFound"))
          .catch(() => done());
      });
    });
  });
});

describe("Genre model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Genre.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Genre.create({ name: "Emmanuel" });
      });
      it("should return name not found", (done) => {
        Genre.findAll()
          .then((r) => expect(r[1].name).to.be.false("NameNotFound"))
          .catch(() => done());
      });
    });
  });
});
