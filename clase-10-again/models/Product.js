import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    minLength: 3, 
    maxLength: 100,
    trim: true, // Elimina espacios al inicio y al final
  },
  
  price: {
    type: Number,
    required: [true, "El precio es requerido"],
    min: 0,
  },
  stock: {
    type: Number,
    required: [true, "El stock es requerido"],
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "Stock must be an integer"
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "La categoría es requerida"]
  }
},{
  timestamps: true,
});

export default mongoose.model("Product", productSchema);
