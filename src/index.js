import express from "express"
import { PrismaClient } from "@prisma/client"
import { taskSchema } from "./validators/taskValidator"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.post("/tasks", async (req, res) => {
  const parseResult = taskSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors })
  }

  const { title, description, status, dueDate } = parseResult.data

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        dueDate: new Date(dueDate),
      },
    })

    res.status(201).json(task)
  } catch (e) {
    console.error("Error creating task:", e)
    res.status(500).json({ error: "Internal server error" })
  }
})

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server running on port 3000"))
}

export default app
