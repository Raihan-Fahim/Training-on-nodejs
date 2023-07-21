const mongoose = require("mongoose");
const request = require("supertest");

const app = require('./employee.model')

describe("POST /employee/add", () => {
    it("should create an employee", async () => {
      const res = await request(app).post("/employee/add").send({
        name: "New employee",
        salary: 19009,
        department: "Science",
      });
    //   expect(res.status).toBe(200);
      expect(res.body.name).toBe("New employee");
    });
  });