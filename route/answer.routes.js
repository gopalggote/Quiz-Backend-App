const express = require('express');

const answerController = require('../controller/answer.controller');
const { answerSchema } = require('../validations/quiz.validation');

const router = express.Router();

// Validation middleware
const validateAnswer = (req, res, next) => {
    const { error } = answerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ statusCode: 400, message: error.details[0].message });
    }
    next();
};

router.post('/submit',validateAnswer, answerController.submitAnswer);

module.exports = router;
