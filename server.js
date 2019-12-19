// Dependencies
const express = require("express");
const path = require("path");
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));

// Setting the port for the application
const PORT = process.env.PORT || 3000;

// Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./controllers/jobs.js");

app.use(routes);

// Begin our server to listen to client request
app.listen(PORT, () => console.log(`Server listening on: http://locahost:${PORT}`));