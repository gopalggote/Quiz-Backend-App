const express = require('express');
const answerController = require('../controller/answer.controller');

const router = express.Router();

router.post('/submit', answerController.submitAnswer);

module.exports = router;
