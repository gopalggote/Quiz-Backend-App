// class Question {
//     constructor(id, text, options, correctOption) {
//         this.id = id;
//         this.text = text;
//         this.options = options; // Array of 4 options
//         this.correctOption = correctOption; // Index of correct option
//     }
// }

// module.exports = { Question };

/**
 * @class Question
 * @param {string} id - The unique identifier for the question.
 * @param {string} text - The text of the question.
 * @param {string[]} options - An array of strings representing 4 answer options.
 * @param {number} correctOption - The index (integer) of the correct answer option.
 */
class Question {
    /**
     * Creates an instance of the Question class.
     * @param {string} id
     * @param {string} text
     * @param {string[]} options
     * @param {string} correctOption
     */
    constructor(id, text, options, correctOption) {
        /** @type {string} */
        this.id = id; // string
        /** @type {string} */
        this.text = text; // string
        /** @type {string[]} */
        this.options = options; // Array of 4 strings
        /** @type {string} */
        this.correctOption = correctOption; // integer representing index of correct option
    }
}

module.exports = { Question };

