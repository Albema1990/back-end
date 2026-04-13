const categories = [
  {id: 1, name: "Electrodomestic", description: "Products for home use",},
  {id: 2, name: "Technology", description: "Products related to technology",}
];

import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
}

export const getCategoryById = async (req, res) => {
  try {
      const { id } = req.params;
  
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(404).json({error: "Invalid category id"});
    }
}

export const createCategory = async (req, res) => {
  if(!req.body.name == undefined){
    return res.status(422).json({error: "name is required"});    
  }

  const data ={
    name: req.body.name,
    description: req.body.description,
  }

  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
}

export const updateCategory = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)){
    return res.status(400).json({error: 'Invalid id'});
  }
  const category = categories.find((cat) => cat.id == id);
  if (!category){
    return res.status(404).json({error: 'Category not found'});
  }

  const { name, description } = req.body;

  category.name = name;
  category.description = description;

  res.json(category);
}

export const deleteCategory = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)){
    return res.status(400).json({error: 'Invalid id'});
  } 
  const categoryIndex = categories.findIndex((cat) => cat.id == id);
  if (categoryIndex === -1){
    return res.status(404).json({error: 'Category not found'});
  } 
  categories.splice(categoryIndex, 1);

  res.status(204).send();
}

export const searchCategory = async(req, res) => {
  const { name } = req.query;

  if (!name){
    return res.status(400).json({error: 'Name query parameter is required'});
  }

  const categories = await Category.find({
    name: { $regex: name, $options: "i" },
  });

  res.json(categories);
}
