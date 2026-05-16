import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const parsedPort = Number(process.env.PORT ?? 3000);
const preferredPort =
  Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;
let currentPort = preferredPort;
const root = resolve("dist");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function getFilePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath === "/" ? "index.html" : safePath);

  return filePath.startsWith(root) ? filePath : join(root, "index.html");
}

const server = createServer((request, response) => {
  const requestedPath = getFilePath(request.url ?? "/");
  const filePath = existsSync(requestedPath)
    ? requestedPath
    : join(root, "index.html");
  const extension = extname(filePath);

  response.setHeader(
    "Content-Type",
    contentTypes[extension] ?? "application/octet-stream"
  );

  createReadStream(filePath)
    .on("error", () => {
      response.statusCode = 404;
      response.end("Not found");
    })
    .pipe(response);
});

function listen(port) {
  server.listen(port);
}

server.on("listening", () => {
  const address = server.address();
  const port =
    typeof address === "object" && address ? address.port : currentPort;

  console.log(`Server running at http://localhost:${port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    currentPort += 1;
    listen(currentPort);
    return;
  }

  throw error;
});

listen(preferredPort);
