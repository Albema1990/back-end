import { validateStock, validatePrice } from "../utils/validators.js";

const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 15.99 },
];

export const getAllProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
};

export const createProduct = (req, res) => {
  if (!validateStock(req.body.stock)) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = products.find((p) => p.id == id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (!validateStock(req.body.stock)) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const { name, price, stock } = req.body;

  product.name = name;
  product.price = Number(price);
  product.stock = Number(stock);

  res.json(product);
};
