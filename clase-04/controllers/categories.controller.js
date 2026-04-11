const categories = [
  {id: 1, name: "Electrodomestic", description: "Products for home use",},
  {id: 2, name: "Technology", description: "Products related to technology",}
];

export const getAllCategories = (req, res) => {
  res.json(categories);
}

export const getCategoryById = (req, res) => {
  const category = categories.find((p) => p.id == req.params.id);
  const id = parseInt(req.params.id);

  if (isNaN(id)){
    return res.status(400).json({error: 'Invalid id'});
  }

  if (!category){
    return res.status(404).json({error: 'Category not found'});
  }
  res.json(category);
}

export const createCategory = (req, res) => {
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

