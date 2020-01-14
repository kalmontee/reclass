const orm = require("../config/orm.js");

const job = {
    all(cb) {
        orm.all("jobs", function(res) {
            cb(res);
        });
    },
    jobTitleKeywords(col, col2, vals, vals2, cb) { // ColumnOne, ColumnTwo, value, value2, cb
        orm.jobTitleKeywords("jobs", col, col2, vals, vals2, function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create(cols, vals, cb) {
        orm.create("jobs", cols, vals, function(res) {
            cb(res);
        });
    },
    update(objColVals, condition, cb) {
        orm.update("jobs", objColVals, condition, function(res) {
            cb(res);
        });
    },
    delete(condition, cb) {
        orm.delete("jobs", condition, function(res) {
            cb(res);
        });
    }
}

module.exports = job;