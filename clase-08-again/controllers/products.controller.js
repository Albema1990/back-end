import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Invalid product id" });
  }
};

export const createProduct = async (req, res) => {
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

  try {

    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(422).json({ error: "Invalid category id" });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    if (error.name == "ValidationError") {
      const errors = {};

      for (const property in error.errors) {
        // console.log(property, error.errors[property].message);
        errors[property] = error.errors[property].message;
      }
      console.log(errors);
      return res.status(422).json({ error: error.errors });
    }
    res.status(500).json({ error: "error interno" });
  }
};

export const updateProduct = async (req, res) => {
  try {

    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(422).json({ error: "Invalid category id" });
    }
    
    const { id } = req.params;

    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
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
  try {
    if (!productDelete) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Invalid product id" });
  }
};
