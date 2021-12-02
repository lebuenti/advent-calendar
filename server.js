const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require("http");
const fs = require("fs");

const port = 9000;

const usernames = ["CATS"];

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
      response.writeHead(200, { "Content-Type": "application/json" });
      let json = JSON.stringify({ auth: token });
      response.end(json);
      return;
    }
  }

  let f;
  if (request.url.startsWith("/assets")) {
    f = "." + request.url;
  } else if (request.url === "/" || request.url === "/login") {
    f = "assets/index.html";
  } else if (request.url.startsWith("/image/")) {
    const token = request.headers.auth;

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const splitted = request.url.split("/");
      f = "calendar_images/" + decoded.username.toLowerCase() + "/" + splitted[splitted.length - 1] + ".jpeg";
    } catch (error) {
      console.error(error);
      response.writeHead(401);
      response.end();
      return;
    }

  } else if (request.url === "/favicon.ico") {
    response.end();
    return;
  } else {
    response.writeHead(404);
    response.write("Whoops! File not found!");
    response.end();
    return;
  }

  fs.readFile(f, null, (error, data) => {
    if (error) {
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
  const tmp = JSON.parse(body);
  const { username, password } = tmp;

  if (!username || !password) {
    return;
  }

  const index = usernames.findIndex((element) => {
    return element.toLowerCase() === username.toLowerCase();
  });

  if (index === -1) {
    return;
  }

  let s = username.toUpperCase();
  const hash = process.env[s];

  const res = bcrypt.compareSync(password, hash);

  if (res === true) {
    return jwt.sign({ username }, process.env.JWT_KEY, {
      algorithm: "HS256",
      expiresIn: "31d",
    });
  }
};
