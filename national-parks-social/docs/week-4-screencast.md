# Week 4 Screencast Guide

## What I Built or Learned

I am using React, TypeScript, and Vite for my frontend.

This week I connected my Login form to a REST API. The form sends an HTTP
`POST` request to `/login` with the user's email and password.

The page now shows a loading state while the request is running and displays an
error if the API rejects the login.

When the API returns a JWT, the app stores it in `localStorage`. Future API
requests read that token and send it in this header:

```text
Authorization: Bearer <token>
```

I also added shared authentication state. The navbar shows Login and Register
when the user is logged out. It shows Profile and Logout when the user is
logged in. The Profile route redirects logged-out users to the Login page.

## Architecture Decision

I separated authentication into a few focused files:

- `src/lib/api.ts` handles HTTP requests and API errors.
- `src/lib/auth.ts` handles JWT storage.
- `src/context/AuthContext.tsx` shares login state across the app.
- `src/components/ProtectedRoute.tsx` protects pages that require login.

I made this decision so pages do not each create their own request, token, and
login logic. The shared structure gives the app one place to change
authentication behavior later.

## Learning Plan Reflection

My learning plan guided me from React components and routing into forms,
frontend state, API requests, and authentication. That order worked well
because the Login page and routes already existed before I connected the API.

I would update the plan by adding a small API contract step before integration.
The frontend needs to know the exact login endpoint, request fields, response
shape, and error format before the full login flow can be tested.

I feel confident with React components, routing, controlled forms, `useState`,
and the basic `fetch` request flow. I still want to solidify testing against the
real backend, handling expired JWTs, and deciding whether the final application
should use `localStorage` or secure HTTP-only cookies.

## Demo Order

1. Show the repository and explain that the frontend uses React, TypeScript,
   and Vite.
2. Open the Login page and show the controlled email and password inputs.
3. Open `src/lib/api.ts` and explain the `POST` request and error handling.
4. Open `src/lib/auth.ts` and explain where the JWT is stored.
5. Open `src/context/AuthContext.tsx` and explain shared login/logout state.
6. Show the navbar changing between Login/Register and Profile/Logout.
7. Log out and try to open `/profile` to demonstrate the protected route.
8. Show the git history with the separate progress commits.

## Local Setup

Create a local `.env` file based on `.env.example`:

```text
VITE_API_BASE_URL=http://localhost:3000
```

The backend must provide:

```text
POST /login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Expected response:

```json
{
  "token": "your-jwt"
}
```

The frontend also accepts `access_token` instead of `token`.
