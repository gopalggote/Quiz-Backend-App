const express = require('express');
const quizController = require('../controller/quiz.controller');

const router = express.Router();

router.post('/create', quizController.createQuiz);
router.get('/list', quizController.getQuizList);
router.get('/fetch/:id', quizController.getQuiz);


module.exports = router;
