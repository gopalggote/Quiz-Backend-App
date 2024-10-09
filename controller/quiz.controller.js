const { Quiz} = require('../model/quiz.model');
const { Question } = require('../model/question.model');
const localStorageService = require('../services/local-storage.service');

/**
 * @swagger
 * /api/quiz/create:
 *   post:
 *     summary: Create a new quiz.
 *     tags: [Create Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "General Knowledge Quiz"
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: "What is the capital of France?"
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["Paris", "London", "Berlin"]
 *                     correctOption:
 *                       type: string
 *                       example: "Paris"
 *     responses:
 *       201:
 *         description: Quiz created successfully.
 *       500:
 *         description: Internal server error.
 */
exports.createQuiz = (req, res) => {
    try {
        const { title, questions } = req.body;
        // Use Date.now() for quiz ID and generate unique IDs for each question
        const quizId = Date.now();
        let questionCounter = 1;
    
        // iterate quesions list to assign primary id
        const quiz = new Quiz(quizId.toString(), title, questions.map(q => {
            const questionId = quizId + questionCounter++; 
            return new Question(questionId.toString(), q.text, q.options, q.correctOption)
        }));
        console.log("quiz.controller.js :: createQuiz() :: quiz id: ",quiz.id);
        localStorageService.saveQuiz(quiz); // store quiz in localstorage
        res.status(201).json({ statusCode:201, message: 'Quiz created' }); 
    } catch (error) {
        console.error("quiz.controller.js :: createQuiz() :: error: ",error);
        res.status(500).json({ statusCode:500, message: 'Internal server error' }); 
    }
    
};

/**
 * @swagger
 * /api/quiz/list:
 *   get:
 *     summary: Get a list of quizzes.
 *     tags: [Quiz List]
 *     responses:
 *       200:
 *         description: Quiz list retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
//fetch list of quiz
exports.getQuizList = (req, res) => {
    try {
        const quiz = localStorageService.getQuizList();
        // Return only queue name and id
        const quizList = quiz.map(q => {
            return {id: q.id, title:q.title }
        });
        console.log("quiz.controller.js :: getQuizList() :: quizList length: ",quizList.length);
        res.status(200).json({ statusCode: 200,message: 'Quiz list fetch successfully', data:  quizList});
    } catch (error) {
        console.error("quiz.controller.js :: getQuizList() :: error: ",error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
};

/**
 * @swagger
 * /api/quiz/fetch/{id}:
 *   get:
 *     summary: Get a quiz by ID.
 *     tags: [Get Quiz By Id]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the quiz.
 *         schema:
 *           type: string
 *           properties:
 *               id:
 *                 type: string
 *                 required: true
 *                 example: "1728452674674"
 *     responses:
 *       200:
 *         description: Quiz retrieved successfully.
 *       404:
 *         description: Quiz not found.
 *       500:
 *         description: Internal server error.
 */
// Method to get quiz by id
exports.getQuiz = (req, res) => {
    try {
        const { id } = req.params;
        const quiz = localStorageService.getQuizById(id);
        if (!quiz) return res.status(404).json({ statusCode: 404, message: 'Quiz not found' });

        // Return questions without correct answer
        const quizWithoutAnswers = { ...quiz, questions: quiz.questions.map(q => ({ ...q, correctOption: undefined })) };
        res.status(200).json({ statusCode: 200, message: 'Quiz fetch successfully', data:quizWithoutAnswers});
    } catch (error) {
        console.error("quiz.controller.js :: getQuiz() :: error: ",error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
};


