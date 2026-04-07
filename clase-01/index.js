import * as http from "node:http";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];

const categories = [
  {
    id: 1,
    name: "Electro",
    description: "Lorem ipsum",
  },
  {
    id: 2,
    name: "Bazar",
    description: "Lorem ipsum bazar",
  },
];

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url == "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "API Running" }));
    return;
  }

  if (req.url == "/ping") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Pong" }));
    return;
  }

  if (req.url == "/products") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(products));
    return;
  }

  if (req.url.startsWith("/products/")) {
    // /products/1
    const id = Number(req.url.split("/")[2]);
    const product = products.find((p) => p.id == id);

    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Producto no encontrado" }));
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(product));
    return;
  }

  if (req.url == "/categories") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(categories));
    return;
  }

  if (req.url.startsWith("/category/")) {
    const id = Number(req.url.split("/")[2]);
    const category = categories.find((cat) => cat.id == id);

    res.setHeader("Content-Type", "application/json");

    if (!category) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Category Not Found" }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(category));
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Not Found" }));
});

server.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
