const express = require("express");
const router = express.Router();
const path = require("path");
const jobs = require("../models/job.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/employer", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/employer.html"));
});

router.get("/recentjobs", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/recentjobs.html"));
});

// To receive all data from the database
router.get("/jobs", (req, res) => {
  jobs.all((data) => res.json({ jobs: data }));
});

// For specific keywords to match in the database for 
// job_title, job_state and for jobs that are available or havent apply to yet.
router.get("/jobs/:title/:state", (req, res, next) => {
  jobs.jobTitleKeywords(["job_title"], ["job_state"], [req.params.title], [req.params.state], ["applied_to"], (data) => {
    res.json({ jobs: data });
    next();
  });
});

// Sending back all results the user has applied to jobs.
router.get("/jobs/applied", (req, res) => {
  jobs.jobsApplied(["applied_to"], (data) => res.json({ jobs: data }));
});

// Sending back all results the user hasn't applied to jobs.
router.get("/jobs/available", (req, res) => {
  jobs.jobsAvailable(["applied_to"], (data) => res.json({ jobs: data }));
});

// Employer.html -- Sending a POST request to the server. 
router.post("/jobs", (req, res) => {
  const {
    company,
    title,
    state,
    city,
    salary,
    job_description,
    job_requirements,
    applied_to,
    job_created } = req.body;

  jobs.create(
    [
      "company_name",
      "job_title",
      "job_state",
      "job_city",
      "job_salary",
      "job_description",
      "job_requirements",
      "applied_to",
      "job_created"
    ],
    [
      company,
      title,
      state,
      city,
      salary,
      job_description,
      job_requirements,
      applied_to,
      job_created
    ],
    // Send back the ID of the new job
    (result) => res.json({ id: result.insertId }));
});

// Update the client Recent jobs and main page with apply btn.
router.put("/jobs/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;
  const { applied_to } = req.body;
  const { id } = req.params;

  jobs.update({ applied_to: applied_to }, condition, (result) => {

    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: id });
    }
  });
});

// Delete jobs from Jobs Applied section and modal
router.delete("/jobs/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  jobs.delete(condition, (result) => {
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