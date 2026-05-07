import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 5,
    trim: true,
  },
  description: {
    type: String,
    minLength: 5,
  },
},{
  timestamps: true,
});

export default mongoose.model("Category", categorySchema);