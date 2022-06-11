"use strict";

const ErrorResponse = require("./../utils/error");
const asyncHandler = require("express-async-handler");
const ApiFeature = require("./apiFeature");

exports.getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    const query = Model.findById(req.params.id);

    if (popOptions) {
      query.populate(popOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new ErrorResponse("No Document found With this ID", 404));
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    return res.status(201).json({
      success: true,
      data: doc,
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new ErrorResponse("No Document found With this ID", 404));
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new ErrorResponse("No Document found With this ID", 404));
    }

    return res.status(200).json({
      success: true,
      data: null,
    });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const feature = new ApiFeature(Model.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const countFeature = Model.count(feature.queryStr);

    const [count, docs] = await Promise.all([countFeature, feature.query]);

    res.status(200).json({
      success: true,
      count: count,
      data: docs,
    });
  });
