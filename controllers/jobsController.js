const express = require("express");
const router = express.Router();

const jobs = require("../models/job.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// To receive all data from the database
router.get("/jobs", function(req, res) {
    jobs.all(function(data) {
        console.log(data);
        res.json({ jobs: data });
    });
});

router.get("/jobs/:title/:state", function(req, res, next) {
    // .. get req.params to define column names and column values for job_title and job_state
    jobs.selectOne(["job_title"], ["job_state"], [req.params.title], [req.params.state], function(data) {
        res.json({ jobs: data });
        next();
    });
});

router.get("/jobs/:state", function(req, res, next) {
    jobs.stateKeywords(["job_state"], [req.params.state], function(data) {
        res.json({ jobs: data });
        next();
    });
});

// Employer.html -- Sending a POST request to the server. 
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


// Send response back to the client to delete a burger
// router.delete("/jobs/:id", (req, res) => {
//     let condition = "id = " + req.params.id;


module.exports = router;