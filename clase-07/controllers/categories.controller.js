import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: "Invalid category id" });
  }
};

export const createCategory = async (req, res) => {
  if (!req.body.name == undefined) {
    return res.status(422).json({ error: "name is required" });
  }

  const data = {
    name: req.body.name,
    description: req.body.description,
  };

  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body.name) {
      return res.status(422).json({ error: "Name is required" });
    }

    const categoryUpdate = await Category.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!categoryUpdate) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(categoryUpdate);
  } catch (error) {
    res.status(404).json({ error: "Invalid category id" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const categoryDelete = await Category.findByIdAndDelete(id);
  try {
    if (!categoryDelete) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Invalid category id" });
  }  
}

export const searchCategory = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  const categories = await Category.find({
    name: { $regex: name, $options: "i" },
  });

  res.json(categories);
};
