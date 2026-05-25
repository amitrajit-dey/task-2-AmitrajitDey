# DecodeLabs · Project 2 — Backend API

**Batch 2026 | Full Stack Development**

> "Project 1 was the skin. Project 2 is the life."

## Run

```bash
node server.js
# or
node --watch server.js   # auto-restart on save (Node 18+)
```

## Test the API

```bash
# Health check
curl http://localhost:3000/api/health

# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"you@example.com","role":"intern"}'

# Get user by ID
curl http://localhost:3000/api/users/1

# Update a user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/1

# Get all posts
curl http://localhost:3000/api/posts

# Create a post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"userId":2,"title":"My First Post","content":"This is my content here."}'
```

## Concepts Applied (from DecodeLabs Kit)

| Concept | Implementation |
|---|---|
| IPO Model | Every controller: Input → Validate → Process → Output |
| RESTful Naming | Nouns only: `/users`, `/posts` |
| HTTP Methods | GET · POST · PUT · DELETE |
| Status Codes | 200 · 201 · 204 · 400 · 404 · 405 · 409 · 500 |
| Gatekeeper Rule | Syntactic + Semantic validation in `validator.js` |
| JSON | Standardised response shape in `response.js` |
| CORS | Headers set in `cors.js` |
| Statelessness | No sessions — every request is self-contained |