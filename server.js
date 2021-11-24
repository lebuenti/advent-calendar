const http = require("http");
const fs = require("fs");

const port = 9000;

const parseQuery = (queryString) => {
  var query = {};
  var pairs = (
    queryString[0] === "?" ? queryString.substr(1) : queryString
  ).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};

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

  if (request.method === "POST" && request.url.includes("/login")) {
    var dataString = "";

    request.on("data", function (data) {
      dataString += data;
    });

    request.on("end", function () {
      let parsedString = parseQuery(dataString);
      // console.log(parsedString["username"]);
      // console.log(parsedString["password"]);
    });
  }

  let f;
  if (request.url.startsWith("/assets")) {
    f = "." + request.url;
  } else if (request.url === "/" || request.url === "/login") {
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
