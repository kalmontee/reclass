const connection = require("./connection.js");

printQuestionMarks = (num) => {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

objToSql = (ob) => {
  let arr = [];

  for (let key in ob) {
    let value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string") {
        value = `'${value}'`;
      }
      arr.push(`${key} = ${value}`);
    }
  }
  return arr.toString();
}

const orm = {
  all(tableInput, cb) {
    const queryString = `SELECT * FROM jobs ${tableInput}`;
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  jobTitleKeywords(jobs, job_title, job_state, value, value2, applied_to, cb) {
    // SELECT * FROM jobs WHERE job_title LIKE '%engineer%developer' OR job_state LIKE '%New Jersey%' AND NOT applied_to;
    const queryString = `SELECT * FROM ${jobs} WHERE ${job_title} LIKE "%${value}%developer" OR ${job_state} LIKE '%${value2}%' AND NOT ${applied_to}`;
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  jobsApplied(jobs, applied_to, cb) {
    const queryString = `SELECT * FROM ${jobs} WHERE ${applied_to}`;
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  // Displaying all the jobs available or the user hasn't applied to yet.
  jobsAvailable(jobs, value, cb) {
    const queryString = `SELECT * FROM ${jobs} WHERE NOT ${value}`;
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  create(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table}`;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ")";

    connection.query(queryString, vals, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  update(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  delete(table, condition, cb) {
    const queryString = `DELETE FROM ${table} WHERE ${condition}`;

    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  }
}

module.exports = orm;