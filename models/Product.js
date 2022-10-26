import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  productId: {
    type: String,
    require: true,
  },
   productName: {
    type: String,
    require: true,
   },
   qty: {
    type: Number,
    require: true,
   },
   type: {
    type: String,
    default: 0,
    require: true,
   },
   price: {
    type: Number,
    default: 0,
    require: true
   },
   desc: {
    type: String,
    require: true,
   },
    date: {
      type: Date,
      default: Date.now
   }
});

const Product = mongoose.model("products", ProductSchema);
export default Product;
