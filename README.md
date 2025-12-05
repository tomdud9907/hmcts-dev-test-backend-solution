# HMCTS Developer Technical Test – Backend

Backend service for the HMCTS technical task, providing an API for creating tasks.

---

## Tech Stack

- Node.js
- Express
- Prisma ORM
- SQLite
- Jest (unit tests)
- Zod (validation)

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
node src/index.js
```

Server runs at:

```
http://localhost:3000
```

---

## Running Tests

```bash
npm test
```

---

## API Documentation

### POST /tasks

Creates a new task.

#### Request Body

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "string (required)",
  "dueDate": "ISO date string (required)"
}
```

#### Success Response (201)

```json
{
  "id": 1,
  "title": "Prepare case files",
  "description": "Optional description",
  "status": "CREATED",
  "dueDate": "2025-12-05T12:00:00.000Z",
  "createdAt": "2025-12-05T11:45:12.000Z"
}
```

#### Error Responses

- **400** – Validation failed (missing or invalid fields)
- **500** – Internal server error

## Notes

- SQLite is used only for the purpose of this technical exercise.
- Only the required "task creation" functionality is implemented.
