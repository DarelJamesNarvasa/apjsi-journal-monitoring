const express = require("express");
const router = express.Router();

const {
  testOjsConnection,
  getSubmissions,
} = require("../controllers/ojsController");

router.get("/test-ojs", testOjsConnection);
router.get("/submissions", getSubmissions);

module.exports = router;