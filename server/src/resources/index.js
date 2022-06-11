"use strict";

const productRoutes = require("./products");

const setRoutes = (app) => {
  app.use("/api/products", productRoutes);
  // Test Api
  app.get("/hello", (req, res) => {
    res.status(200).json({
      message: "Hello World",
    });
  });
};

module.exports = setRoutes;
