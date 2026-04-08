import * as http from "node:http";

const server = http.createServer((req, res) => {
  res.end("OK");

  if (req.url == "/ping") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "pong" }));
    return;
  }
});

server.listen(3000, () => console.log("http://localhost:3000"));
