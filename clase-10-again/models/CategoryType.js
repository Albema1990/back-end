import mongoose from "mongoose";

const CategoryTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});


const CategoryType = mongoose.model("CategoryType", CategoryTypeSchema);

export default CategoryType;