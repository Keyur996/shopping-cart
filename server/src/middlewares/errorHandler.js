"use strict";

const ErrorResponse = require("./../utils/error");
const _ = require("lodash");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message ?? err;

  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  if (err.name === "CastError") {
    const message = "Resource Not Found";
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate Field value Entered";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = _.map(err.errors || {}, (val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode ?? 500).json({
    success: false,
    error: error.message ?? "Something Went Wrong!!",
  });
};

module.exports = errorHandler;
