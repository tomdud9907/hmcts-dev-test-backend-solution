import request from "supertest"
import app from "../src/index.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.task.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe("POST /tasks", () => {
  it("creates a task with valid data", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Test task",
      description: "desc",
      status: "CREATED",
      dueDate: "2025-12-05T12:00:00Z",
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe("Test task")
    expect(response.body.id).toBeDefined()
  })

  it("returns 400 when required fields are missing", async () => {
    const response = await request(app).post("/tasks").send({
      description: "missing everything",
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("Missing required fields")
  })
})
