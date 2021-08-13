const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("I want to be famous");
})

module.exports = app;