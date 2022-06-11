"use strict";

const _ = require("lodash");

class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.queryStr = this.#makeQuery(queryString);
  }

  #makeQuery = (queryString) => {
    const clonedQuery = _.cloneDeep(queryString);
    const excludedFilters = ["page", "limit", "sort", "fields"];
    // delete Some Query
    excludedFilters.forEach((el) => delete clonedQuery[el]);
    let queryStr = JSON.stringify(clonedQuery);
    queryStr.replace(/(gt|gte|lt|lte)/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    return queryStr;
  };

  filter = () => {
    let queryStr = this.#makeQuery(this.queryString);
    this.query = this.query.find(queryStr);

    return this;
  };

  sort = () => {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }

    return this;
  };

  paginate = () => {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = limit * (page - 1);

    this.query = this.query.skip(skip).limit(limit);

    return this;
  };

  limitFields = () => {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").limit(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  };
}

module.exports = ApiFeature;
