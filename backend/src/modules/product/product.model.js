import mongoose from "mongoose";
import { optionsSchema } from "../../shared/constants/optionsShema.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  optionsSchema,
);

const Product = mongoose.model("Product", productSchema);

export default Product;
