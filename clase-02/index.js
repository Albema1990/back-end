import express from "express";

const app = express();
app.use(express.json());

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

const categories = [
  {
    id: 1,
    name: "Electrodomestic",
    description: "Products for home use",
  },
  {
    id: 2,
    name: "Technology",
    description: "Products related to technology",
  }
]

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
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

app.post("/products", (req, res) => {
  const newProduct ={
    id: Date.now(),
    name: req.body.name,
    description: req.body.price,
  }

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.get("/categories/:id", (req, res) => {
  const category = categories.find((p) => p.id == req.params.id);
  const id = parseInt(req.params.id);

  if (isNaN(id)){
    return res.status(400).json({error: 'Invalid id'});
  }

  if (!category){
    return res.status(404).json({error: 'Category not found'});
  }
  res.json(category);
});

app.post("/categories", (req, res) => {
  if(!req.body.name == undefined){
    return res.status(422).json({error: "name is required"});    
  }

  const newCategory ={
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
  }

  categories.push(newCategory);

  res.status(201).json(newCategory);
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
