// intialize express app
const express = require("express");
const app = express();

// gloable middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to access url form encoded
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); // allow http requists bet back-end & front-end

// required modules
const auth = require("./routes/Auth");
const admin = require("./routes/admin");
const patient = require("./routes/patients");

// run app
app.listen(4000, "localhost", () => {
  console.log("server is running ");
});

// api routes
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/patient", patient);
