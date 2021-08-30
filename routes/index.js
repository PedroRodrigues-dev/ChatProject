// Modules
const express = require("express");
const router = express.Router();

// Initial Page GET Route
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
