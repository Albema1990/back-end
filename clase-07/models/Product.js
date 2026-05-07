import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3, 
    maxLength: 100,
    trim: true, // Elimina espacios al inicio y al final
  },
  
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "Stock must be an integer"
    },
  },
},{
  timestamps: true,
});

export default mongoose.model("Product", productSchema);
