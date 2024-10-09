// class Answer {
//     constructor(questionId, selectedOption, isCorrect) {
//         this.questionId = questionId;
//         this.selectedOption = selectedOption;
//         this.isCorrect = isCorrect;
//     }
// }

// module.exports = Answer;


/**
 * @class Answer
 * @param {string} questionId - The ID of the question.
 * @param {string} selectedOption - The index of the selected option (integer).
 * @param {boolean} isCorrect - Whether the answer is correct or not (boolean).
 */
class Answer {
    /**
     * Creates an instance of the Answer class.
     * @param {string} questionId
     * @param {string} selectedOption
     * @param {boolean} isCorrect
     */
    constructor(questionId, selectedOption, isCorrect) {
        /** @type {string} */
        this.questionId = questionId; // string
        /** @type {string} */
        this.selectedOption = selectedOption; // integer
        /** @type {boolean} */
        this.isCorrect = isCorrect; // boolean
    }
}

module.exports = Answer;
