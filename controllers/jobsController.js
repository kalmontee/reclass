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

// Send response back to the client to delete a burger
// router.delete("/jobs/:id", (req, res) => {
//     let condition = "id = " + req.params.id;


module.exports = router;