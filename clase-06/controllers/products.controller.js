import { validateStock, validatePrice } from "../utils/validators.js";

import Product from "../models/Product.js";

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
    res.status(404).json({ error: "Invalid product id" });
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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!productUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(productUpdate);
  } catch (error) {
    res.status(404).json({ error: "Invalid product id" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

 const productDelete = await Product.findByIdAndDelete(id);
 try{
    if (!productDelete) {
    return res.status(404).json({ error: "Product not found" });
  }
  
 res.status(204).send();
 } catch (error) {
  res.status(404).json({ error: "Invalid product id" });
 }
};
