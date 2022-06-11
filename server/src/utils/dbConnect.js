"use strict";

const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("DB connection Successful !!");
  } catch {
    console.log("DB connection Failed !!");
  }
};
