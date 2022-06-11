"use strict";

require("dotenv").config();
const app = require("./app");
const setMongo = require("./utils/dbConnect");
const setRoutes = require("./resources");
const errorHandler = require("./middlewares/errorHandler");

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await setMongo();
    setRoutes(app);
    app.use(errorHandler);
    app.listen(port, () => console.log(`Server is Running on ${port}`));
  } catch (err) {
    console.log("Something Went Wrong !!", err);
  }
};

module.exports = start;
