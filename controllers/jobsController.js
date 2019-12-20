const express = require("express");
const router = express.Router();

const job = require("../models/job.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/jobs", (req, res) => {
    jobs.all(data => res.json({ jobs: data }));
});

// Send response back to the client to create a burger
// router.post("/jobs", (req, res) => {
//     burger.create([

//     ], [
//         req.body.burger, req.body.devoured
//     ], (results) => res.json({ id: results.insertId }));
// });

router.get("/jobs", function(req, res) {
    cat.all(function(data) {
        res.json({ jobs: data });
    });
});

// Send response back to the client to create a burger
router.post("/jobs", (req, res) => {
    jobs.create([

    ], [
        req.body.jobs, req.body.devoured
    ], function(results) {
        res.json({ id: results.insertId })
    });
});


// // Send response back to the client to update
// router.put("/jobs/:id", (req, res) => {
//     let condition = "id = " + req.params.id;
//     console.log("condition", condition);


//     burger.update({
//         job: req.body.jobs

//     }, condition, (results) => results.changedRows == 0 ? res.status(404).end() : res.json({ id: req.params.id }));
// });

    jobs.update({
        jobs: req.body.jobs
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});

// // Send response back to the client to delete a burger
// router.delete("/jobs/:id", (req, res) => {
//     let condition = "id = " + req.params.id;


//     burger.delete(condition, (results) => results.affectedRows == 0 ? res.status(404).end() : res.status(200).end());
// });

    jobs.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


module.exports = router;