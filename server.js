const http = require("http");
const fs = require("fs");

const port = 9000;

let handleRequest = (request, response) => {
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

  // if (request.method === "POST" && request.url === "/signin") {
  //   //dann so ein jwt erstellen.
  // }

  let f;
  if (request.url.startsWith("/assets")) {
    f = "." + request.url;
  } else if (request.url === "/") {
    f = "assets/index.html";
  } else if (request.url.startsWith("/calendar_images")) {
    f = "." + request.url;
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
