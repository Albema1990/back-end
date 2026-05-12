import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    minLength: [2, "Name must be at least 2 characters long"],
    maxLength: [50, "Name must be at most 5 characters long"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryType",
    required: true,
  }
},
{
  timestamps: true,
});

export default mongoose.model("Category", categorySchema);