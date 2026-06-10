# National Parks Social

A React national parks map served by Node and built with Vite.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## API Configuration

Copy `.env.example` to `.env` and set the URL for the REST API:

```text
VITE_API_BASE_URL=http://localhost:3000
```

The Login page sends a `POST` request to `/login`. A successful response should
return either a `token` or `access_token` field containing the JWT.

See `docs/week-4-screencast.md` for the authentication flow, architecture
summary, and screencast checklist.

Open the local URL printed by Vite.

## Production

Build the browser bundle:

```bash
npm run build
```

Serve the built app with Node:

```bash
npm start
```

The Node server starts at `http://localhost:3000` by default. If that port is already in use, it automatically tries the next port until one is available. Set `PORT` to choose a different starting port.
