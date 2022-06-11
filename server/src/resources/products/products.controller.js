"use strict";

const factory = require("./../../utils/handlerfactory");
const Product = require("./products.model");

exports.getAll = factory.getAll(Product);
