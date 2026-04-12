import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  description: Text,
});

export default mongoose.model("Category", categorySchema);