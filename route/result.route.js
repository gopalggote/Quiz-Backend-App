const express = require('express');
const resultController = require('../controller/result.controller');

const router = express.Router();

// Route to get results for a specific quiz and user
router.get('/:quizId/:userId', resultController.getResults);

module.exports = router;
