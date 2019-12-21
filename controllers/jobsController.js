const express = require("express");
const router = express.Router();

const jobs = require("../models/job.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/jobs", function(req, res) {
    jobs.all(function(data) {
        res.json({ jobs: data });
    });
});

router.post("/jobs", function(req, res) {
    jobs.create([
      "job_title", "job_state", "job_city", "job_salary", "job_description", "job_requirements"
    ], [
      req.body.title, req.body.state, req.body.city, req.body.salary, req.body.job_description, req.body.requirements
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });





// Send response back to the client to create a burger
// router.post("/jobs", (req, res) => {
//     burger.create([

//     ], [
//         req.body.burger, req.body.devoured
//     ], (results) => res.json({ id: results.insertId }));
// });

// Send response back to the client to create a burger
// router.post("/jobs", (req, res) => {
//     jobs.create([

//     ], [
//         req.body.jobs, req.body.devoured
//     ], function(results) {
//         res.json({ id: results.insertId })
//     });
// });

// Send response back to the client to delete a burger
// router.delete("/jobs/:id", (req, res) => {
//     let condition = "id = " + req.params.id;


module.exports = router;