const express = require('express');

const quizController = require('../controller/quiz.controller');
const { createQuizSchema } = require('../validations/quiz.validation');

const router = express.Router();

// Validation middleware
const validateCreateQuiz = (req, res, next) => {
    const { error } = createQuizSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ statusCode: 400, message: error.details[0].message });
    }
    next();
};

router.post('/create',validateCreateQuiz, quizController.createQuiz);
router.get('/list', quizController.getQuizList);
router.get('/fetch/:id', quizController.getQuiz);


module.exports = router;
