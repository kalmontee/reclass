const orm = require("../config/orm.js");

const job = {
    all(cb) {
        orm.all("jobs", (res) => cb(res));
    },
    create(cols, vals, cb) {
        orm.create("jobs", cols, vals, (res) => cb(res));
    },
    update(objColVals, condition, cb) {
        orm.update("jobs", objColVals, condition, (res) => cb(res));
    },
    delete(condition, cb) {
        orm.delete("jobs", condition, (res) => cb(res));
    }
}

module.exports = job;