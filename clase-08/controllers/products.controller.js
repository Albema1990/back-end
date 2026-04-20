import { validateStock, validatePrice } from "../utils/validators.js";

import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;

    const product = await Product.findById(id);
    // console.log(product);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Invalid product id" });
  }
};

export const createProduct = async (req, res) => {
  try {
    // if (!validateStock(req.body.stock)) {
    //   return res.status(422).json({ error: "Invalid stock" });
    // }

    // if (!validatePrice(req.body.price)) {
    //   return res.status(422).json({ error: "Invalid price" });
    // }

    // const data = {
    //   name: req.body.name,
    //   price: Number(req.body.price),
    //   stock: Number(req.body.stock),
    // };

    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    if (error.name == "ValidationError") {
      // console.log(error.errors);

      const errors = {};

      for (const property in error.errors) {
        // console.log(property, error.errors[property].message);
        errors[property] = error.errors[property].message;
      }

      // console.log(errors);

      // return res.status(422).json({ error: error.errors });
      return res.status(422).json({ error: errors });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // if (!validateStock(req.body.stock)) {
    //   return res.status(422).json({ error: "Invalid stock" });
    // }

    // if (!validatePrice(req.body.price)) {
    //   return res.status(422).json({ error: "Invalid price" });
    // }

    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!productUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(productUpdate);
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(422).json({ error: error.errors });
    }

    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid id" });
    }

    res.status(500).json({ error: "Error interno" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productDelete = await Product.findByIdAndDelete(id);

    if (!productDelete) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Invalid product id" });
  }
};

export const searchProduct = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(422).json({ error: "Name is required" });
  }

  const products = await Product.find({
    name: { $regex: name, $options: "i" },
  });

  res.json(products);
};