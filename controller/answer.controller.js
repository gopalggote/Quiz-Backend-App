
/**
 * @swagger
 * /api/answer/submit:
 *   post:
 *     summary: Submit an answer for a quiz question.
 *     tags: [Submit Answer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *                 required: true
 *                 example: "1728452674674"
 *               questionId:
 *                 type: string
 *                 required: true
 *                 example: "1728452674676"
 *               selectedOption:
 *                 type: string
 *                 required: true
 *                 example: "4"
 *               userId:
 *                 type: string
 *                 required: true
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Answer submitted successfully.
 *       404:
 *         description: Quiz or question not found.
 *       500:
 *         description: Internal server error.
 */

const Answer = require('../model/answer.model');
const Result = require("../model/result.model");
const localStorageService = require('../services/local-storage.service');

exports.submitAnswer = (req, res) => {
    try {
        const { quizId, questionId, selectedOption, userId } = req.body;
        const quiz = localStorageService.getQuizById(quizId);

        // check quiz is present or not
        if (!quiz) return res.status(404).json({ statusCode:404, message: 'Quiz not found' });

        // check question is present in quiz or not
        const question = quiz.questions.find(q => q.id === questionId);
        if (!question) return res.status(404).json({ statusCode:404, message: 'Question not found' });

        // check the answer is correct or not
        const isCorrect = question.correctOption.toLowerCase() === selectedOption.toLowerCase();
        const answer = new Answer(questionId, selectedOption, isCorrect);
        
        // Initialize or retrieve existing result
        let existingResult = localStorageService.getResultsByQuizId(quizId, userId);
        existingResult = existingResult[0];
        console.log("answer.controller.js :: submitAnswer() ::  existingResult : userId, quizId", existingResult.userId, existingResult.quizId);
        // Check if the results array exists; if not, initialize it
        if (!Array.isArray(existingResult.answers)) {
            existingResult.answers = [];
        }

        // check user already submit the answer for question or not
        const answerExists = existingResult.answers.find(answer => answer.questionId === questionId);
        console.log("answer.controller.js :: submitAnswer() ::  answerExists", answerExists);
        if (answerExists) {
            return res.status(400).json({ statusCode:400, message: 'You can submit answer at once.' });
        } 

        // set the user score
        if (!existingResult.score) {
            existingResult.score = 0;
        }
        // Update the score if the answer is correct
        if (isCorrect) {
            existingResult.score += 1;
        }
        
        // Add the answer to the answers array
        existingResult.answers.push(answer);
        //console.log("answer.controller.js :: submitAnswer() :: quizId, userId, existingResult:", JSON.stringify(existingResult));
        const resultObj = new Result(quizId,userId,existingResult.score,existingResult.answers);
        console.log("answer.controller.js :: submitAnswer() ::  resultObj : quizId,userId", resultObj.quizId, resultObj.userId);
        localStorageService.saveResult(resultObj);

        res.status(200).json({
            statusCode:200,
            message: isCorrect ? 'Correct answer!' : 'Incorrect answer',
            correctOption: isCorrect ? '' : question.correctOption
        });
    } catch (error) {
        console.error("answer.controller.js :: submitAnswer() :: error:", error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
};

