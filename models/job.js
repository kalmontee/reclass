const orm = require("../config/orm.js");

const job = {
  all(cb) {
    orm.all("jobs", (res) => {
      cb(res);
    });
  },

  jobTitleKeywords(table, col, vals, vals2, vals3, cb) { // ColumnOne, ColumnTwo, value, value2, cb
    orm.jobTitleKeywords("jobs", table, col, vals, vals2, vals3, (res) => {
      cb(res);
    });
  },

  jobsApplied(table, col, cb) {
    orm.jobsApplied("jobs", table, col, (res) => {
      cb(res);
    });
  },

  jobsAvailable(table, col, cb) {
    orm.jobsAvailable("jobs", table, col, (res) => {
      cb(res);
    });
  },

  // The variables cols and vals are arrays.
  create(cols, vals, cb) {
    orm.create("jobs", cols, vals, (res) => {
      cb(res);
    });
  },

  update(objColVals, condition, cb) {
    orm.update("jobs", objColVals, condition, (res) => {
      cb(res);
    });
  },

  delete(condition, cb) {
    orm.delete("jobs", condition, (res) => {
      cb(res);
    });
  }
}

module.exports = job;