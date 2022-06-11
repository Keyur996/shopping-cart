"use strict";

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: [200, "Please enter name upto 200 character"],
    },
    image: {
      type: String,
      required: [true, "Please upload image!!"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Price"],
    },
    colors: [
      {
        type: String,
        required: [true, "Please provide color"],
        enum: ["Red", "Black", "Blue"],
      },
    ],
    categories: [
      {
        type: String,
        required: [true, "Please provide Category"],
        enum: ["electronics", "cloths"],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
