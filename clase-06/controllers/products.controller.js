import { validateStock, validatePrice } from "../utils/validators.js";

import Product from "../models/Product.js";

const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 15.99 },
];

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(404).json({error: "Invalid product id"});
  }
};

export const createProduct = async (req, res) => {
  if (!validateStock(req.body.stock)) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const data = {
    name: req.body.name,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
};


export const updateProduct = async(req, res) => {
  const {id} = req.params;

 const productUpdate = await Product.findByIdAndUpdate(id, req.body, {new: true});

 res.json(productUpdate);

}


export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const productIndex = products.findIndex((p) => p.id == id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(productIndex, 1);

  res.status(204).send();
};

export const searchProduct = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(422).json({ error: "Name query parameter is required" });
  }

  const products = await Product.find({
    name: { $regex: name, $options: "i" },
  });

  res.json(products);
};
