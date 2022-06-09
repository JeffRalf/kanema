const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.json({ message: "Hello from Express!" });
});

module.exports = router;
