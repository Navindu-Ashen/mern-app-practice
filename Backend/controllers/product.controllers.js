import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching products: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid id", id);
    return res
      .status(404)
      .send({ success: false, message: "Product not found" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    res.status(200).send({ success: true, data: product });
  } catch (error) {
    console.log("Error fetching product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name && !product.price && !product.image) {
    return res
      .status(400)
      .send({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).send({ success: true, data: newProduct });
    console.log(newProduct);
  } catch (error) {
    console.log("Error creating product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid id", id);
    return res
      .status(404)
      .send({ success: false, message: "Product not found" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error updating product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid id", id);
    return res
      .status(404)
      .send({ success: false, message: "Product not found" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error deleting product: ", error.message);
    res.status(404).send({ success: false, message: "Product not found" });
  }
};
