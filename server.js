const jwt = require("jsonwebtoken");
const http = require("http");
const fs = require("fs");

const port = 9000;

let handleRequest = async (request, response) => {
  let contentType = "";
  if (request.url.endsWith(".js")) {
    contentType = "application/javascript";
  } else if (request.url.endsWith(".html")) {
    contentType = "text/html";
  } else if (request.url.endsWith(".css")) {
    contentType = "text/css";
  }
  response.writeHead(200, {
    "Content-Type": contentType,
  });

  if (request.method === "POST" && request.url.includes("/signin")) {
    const body = await new Promise((resolve, reject) => {
      let b = [];
      request
      .on("data", (chunk) => {
        b.push(chunk);
      })
      .on("end", () => {
        b = Buffer.concat(b).toString();
        resolve(b);
      })
      .on("error", reject);
    });
    let token = createToken(body);
    if (!token) {
      response.writeHead(401);
      response.end("Username or password invalid");
      return;
    } else {
      response.json({ token });
      return;
    }
  }

  console.log("Incoming request" + request.url);

  let f;
  if (request.url.startsWith("/assets")) {
    f = "." + request.url;
  } else if (request.url === "/" || request.url === "/login") {
    f = "assets/index.html";
  } else if (request.url.startsWith("/calendar_images")) {
    f = "." + request.url;
  } else if (request.url === "/favicon.ico") {
    return;
  } else {
    response.writeHead(404);
    response.write("Whoops! File not found!");
    return;
  }

  fs.readFile(f, null, (error, data) => {
    if (error) {
      console.log("Not found?")
      response.writeHead(404);
      response.write("Whoops! File not found!");
    } else {
      response.write(data);
    }
    response.end();
  });
};

http.createServer(handleRequest).listen(port);
console.log("server running on port " + port);

const createToken = (body) => {
  const { username, password } = body;

  if (!username || !password || users[username] !== password) {
    return;
  }

  const token = jwt.sign({ username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  return token;
};
