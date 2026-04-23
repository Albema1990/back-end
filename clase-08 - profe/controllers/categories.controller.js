import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate("type", "name");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid ID" });
    }

    res.status(500).json({ error: "Server error" });
  }
};

export const createCategory = async (req, res) => {
  try {
    // if (!req.body.name) {
    //   return res.status(422).json({ error: "No tiene nombre" });
    // }

    // const data = {
    //   name: req.body.name,
    //   description: req.body.description,
    // };

    const category = new Category(req.body);
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(422).json({ error: error.errors });
    }

    res.status(500).json({ error: "Error al crear categoría" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // if (!req.body.name) {
    //   return res.status(422).json({ error: "Name required" });
    // }

    const categoryUpdate = await Category.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!categoryUpdate) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoryUpdate);
  } catch (error) {
    if (error.name == "ValidationError") {
      const errors = {};

      for (const property in error.errors) {
        errors[property] = error.errors[property].message;
      }

      return res.status(422).json({ error: errors });
    }

    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid ID" });
    }

    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryDelete = await Category.findByIdAndDelete(id);

    if (!categoryDelete) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(204).send();
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid ID" });
    }

    res.status(500).json({ error: "Server error" });
  }
};