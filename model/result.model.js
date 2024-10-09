// class Result {
//     constructor(quizId, userId, score, answers) {
//         this.quizId = quizId;
//         this.userId = userId;
//         this.score = score;
//         this.answers = answers; // Array of answers provided by user
//     }
// }

// module.exports = Result;

// Import the Answer model if needed (assuming Answer is used in answers array)
const { Answer } = require('./answer.model');

/**
 * @class Result
 * @param {string} quizId - The ID of the quiz.
 * @param {string} userId - The ID of the user.
 * @param {number} score - The user's score in the quiz.
 * @param {Answer[]} answers - Array of answers provided by the user.
 */
class Result {
    /**
     * Creates an instance of the Result class.
     * @param {string} quizId
     * @param {string} userId
     * @param {number} score
     * @param {Answer[]} answers
     */
    constructor(quizId, userId, score, answers) {
        /** @type {string} */
        this.quizId = quizId; // string
        /** @type {string} */
        this.userId = userId; // string
        /** @type {number} */
        this.score = score; // number
        /** @type {Answer[]} */
        this.answers = answers; // Array of Answer objects
    }
}

module.exports = Result;
