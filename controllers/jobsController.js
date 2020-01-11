const express = require("express");
const router = express.Router();
const path = require("path");
const jobs = require("../models/job.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/employer", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employer.html"));
});

router.get("/recentjobs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/recentjobs.html"));
});

// To receive all data from the database
router.get("/jobs", function(req, res) {
    jobs.all(function(data) {
        // console.log(data);
        res.json({ jobs: data });
    });
});

// To receive the exact data from inputs (job_title and job_state);
router.get("/jobs/:title/:state", function(req, res, next) {
    // get req.params to define column names and column values for job_title and job_state
    jobs.selectOne(["job_title"], ["job_state"], [req.params.title], [req.params.state], function(data) {
        res.json({ jobs: data });
        next();
    });
});

// For specific keywords to match in the database -- Send back request to the client
router.get("/jobs/:state", function(req, res, next) {
    jobs.stateKeywords(["job_state"], [req.params.state], function(data) {
        res.json({ jobs: data });
        next();
    });
});

// Employer.html -- Sending a POST request to the server. 
router.post("/jobs", function(req, res) {
    jobs.create([
        "company_name", "job_title", "job_state", "job_city", "job_salary", "job_description", "job_requirements", "applied_to", "job_created"
    ], [
        req.body.company, req.body.title, req.body.state, req.body.city, req.body.salary, req.body.job_description, req.body.job_requirements, req.body.applied_to, req.body.job_created

    ], function(result) {
        // Send back the ID of the new job
        res.json({ id: result.insertId });
    });

});

// Update the client Recent jobs and main page with apply btn.
router.put("/jobs/:id", function(req, res) {
    let condition = "id = " + req.params.id;
    jobs.update({
        applied_to: req.body.applied_to
    }, condition, function(result) {


        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });

});

// Delete jobs from Jobs Applied section and modal
router.delete("/jobs/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    jobs.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            // If rows were changed, then the ID exist, so 200 (successful)
            res.status(200).end();
        }
    });
});


module.exports = router;