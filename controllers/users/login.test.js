require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const { loginUser } = require("./login");

const { MONGODB_URI_TEST } = process.env;

const body = {
  email: "tanya1@example.com",
  password: "examplepassword",
};
describe("test fn of login", () => {
  beforeAll(async () => {
    await mongoose
      .connect(MONGODB_URI_TEST)
      .then(() => console.log("DB connected"))
      .catch((e) => console.log(e));
  });

  it("status===200", async () => {
    const response = await supertest(app).post("users/login").send(body);
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
