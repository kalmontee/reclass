const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

router.get("/jobs", (req, res) => {
    burger.all(data => res.json({ jobs: data }));
});

// Send response back to the client to create a burger
router.post("/jobs", (req, res) => {
    burger.create([

    ], [
        req.body.burger, req.body.devoured
    ], (results) => res.json({ id: results.insertId }));
});

// Send response back to the client to update
router.put("/jobs/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update({
        job: req.body.jobs

    }, condition, (results) => results.changedRows == 0 ? res.status(404).end() : res.json({ id: req.params.id }));
});

// Send response back to the client to delete a burger
router.delete("/jobs/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    burger.delete(condition, (results) => results.affectedRows == 0 ? res.status(404).end() : res.status(200).end());
});

module.exports = router;