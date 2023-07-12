const express = require('express');
const router = express.Router();

const {showData } = require('../controllers/getData')

router.get("/", showData)

module.exports = router