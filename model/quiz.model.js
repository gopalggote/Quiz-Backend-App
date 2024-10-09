
// class Quiz {
//     constructor(id, title, questions) {
//         this.id = id;
//         this.title = title;
//         this.questions = questions; // Array of questions
//     }
// }

// module.exports = { Quiz };

const { Question } = require('./question.model');
/**
 * @class Quiz
 * @param {string} id - The unique identifier for the quiz.
 * @param {string} title - The title of the quiz.
 * @param {Question[]} questions - An array of Question objects.
 */
class Quiz {
    /**
     * Creates an instance of the Quiz class.
     * @param {string} id
     * @param {string} title
     * @param {Question[]} questions
     */
    constructor(id, title, questions) {
        /** @type {string} */
        this.id = id; // string
        /** @type {string} */
        this.title = title; // string
        /** @type {Question[]} */
        this.questions = questions; // Array of Question objects
    }
}

module.exports = { Quiz };

