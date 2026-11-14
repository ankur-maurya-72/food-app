# API Reference

The Express API defaults to port `3000`. Set `PORT=8000` in `backend/.env` for compatibility with the current frontend, which sends requests to `http://localhost:8000`.

All request and response bodies use JSON. Signup, login, and todo requests that need authentication use the `token` HTTP-only cookie set by the backend; browser clients must send credentials.

## Authentication

### `POST /signup`

Create an account. A token cookie is set on success.

```json
{
  "username": "Ada",
  "email": "ada@example.com",
  "password": "your-password"
}
```

### `POST /login`

Sign in and set the token cookie.

```json
{
  "email": "ada@example.com",
  "password": "your-password"
}
```

### `GET /logout`

Clear the token cookie.

## Todos

These endpoints require the token cookie. Todos are associated with the authenticated user.

### `GET /todo/fetch`

Return the current user's todos.

### `POST /todo/create`

Create a todo.

```json
{
  "text": "Buy groceries",
  "completed": false
}
```

### `PUT /todo/update/:id`

Update a todo by its MongoDB document ID. Send the fields to update, for example:

```json
{
  "completed": true
}
```

### `DELETE /todo/delete/:id`

Delete a todo by its MongoDB document ID.

## Example with curl

Keep the cookie jar between requests so the authenticated todo routes receive the login cookie:

```sh
curl -i -c cookies.txt -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"your-password"}' \
  http://localhost:8000/login

curl -i -b cookies.txt http://localhost:8000/todo/fetch
```

For browser requests, use `withCredentials: true` (as the frontend currently does).
