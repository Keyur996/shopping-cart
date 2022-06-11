"use strict";

const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const path = require("path");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "./uploads")));
app.use(hpp());
app.use(xss());

module.exports = app;
