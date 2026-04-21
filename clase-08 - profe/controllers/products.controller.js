import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
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
    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(422).json({ error: "Category not found" });
    }

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

    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(422).json({ error: "Category not found" });
    }

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

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId }).populate(
      "category",
    );
    res.json(products);
  } catch (error) {

    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid category id" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
