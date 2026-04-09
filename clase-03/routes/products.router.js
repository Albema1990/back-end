import { Router } from "express";

const router = Router();

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 10.99,
  },
  {
    id: 2,
    name: "Product 2",
    price: 15.99,
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  const id = parseInt(req.params.id);

  if (isNaN(id)){
    return res.status(400).json({error: 'Invalid id'});
  }

  if (!product){
    return res.status(404).json({error: 'Product not found'});
  }
  res.json(product);
});

router.post("/", (req, res) => {
  const newProduct ={
    id: Date.now(),
    name: req.body.name,
    description: req.body.price,
  }

  products.push(newProduct);

  res.status(201).json(newProduct);
});

export default router;