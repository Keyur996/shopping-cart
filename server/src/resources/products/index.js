"use strict";

const express = require("express");

const productController = require("./products.controller");

const router = express.Router();

router.route("").get(productController.getAll);

module.exports = router;
