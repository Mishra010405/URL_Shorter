const express = require('express');
const { handlegrenratenewurl } = require("../controllers/url.controller.js");
console.log(handlegrenratenewurl);

const router = express.Router();

router.post('/', handlegrenratenewurl);

module.exports = router;
