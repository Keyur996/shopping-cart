"use strict";

require("dotenv").config({ path: "./../../.env" });

const Product = require("./../resources/products/products.model");
const setMongo = require("./../utils/dbConnect");
let total = 30;

function makeProductData() {
  const colors = ["Red", "Black", "Blue"];
  const categories = ["electronics", "cloths"];
  function makeObject(index) {
    return {
      name: `Product ${index}`,
      image: `http://localhost:3000/uploads/Product-${index}.jpg`,
      price: parseInt(index * 50),
      colors: [colors[Math.floor(Math.random() * colors.length)]],
      categories: [categories[Math.floor(Math.random() * categories.length)]],
    };
  }

  let products = [];
  for (let i = 0; i < total; i++) {
    products.push(makeObject(i));
  }
  return products;
  //   console.log(products);
}

async function start() {
  try {
    await setMongo();
    await Product.deleteMany({});
    const res = await Product.insertMany(makeProductData());

    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

start();
