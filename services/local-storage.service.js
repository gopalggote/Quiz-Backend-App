const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, 'data.json');

// Initialize the data file if it doesn't exist
if (!fs.existsSync(DATA_FILE_PATH)) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({ quizzes: [], results: [] }));
}

const localStorageService = {
    // Method to create new quiz
    saveQuiz(quiz) {
        try {
            const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
            data.quizzes.push(quiz);
            fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));
        } catch (error) {
            console.error("Error reading data file:", error);
            return null; // In case of an error, return null
        }
    },

    // Method to fetch quiz list
    getQuizList() {
        try {
            const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
            return data.quizzes;
        } catch (error) {
            console.error("Error fetcing result:", error);
            return null; // In case of an error, return null
        }
    },

    //Method to fetch quiz by id
    getQuizById(id) {
        try {
            const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
            const quiz = data.quizzes.find(quiz => quiz.id === id);
            return quiz || null; // Return the quiz or null if not found
        } catch (error) {
            console.error("Error reading data file:", error);
            return null; // In case of an error, return null
        }
    },

    //Method to save the result
    saveResult(result) {
        try {
            const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
    
            // Initialize results array if it doesn't exist
            if (!data.results) {
                data.results = [];
            }
    
            // Check if the result for the given quizId and userId already exists
            const existingResultIndex = data.results.findIndex(
                (r) => r.quizId === result.quizId && r.userId === result.userId
            );
    
            if (existingResultIndex !== -1) {
                // Update the existing result by appending new answers
                data.results[existingResultIndex].score = result.score;
                data.results[existingResultIndex].answers = result.answers;
            } else {
                // If no result exists, create a new entry
                data.results.push(result);
            }
    
            // Write the updated data back to the file
            fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2)); // Format JSON for better readability
        } catch (error) {
            console.error("Error saving result:", error);
        }
    },
    
    // Filter results that match both quizId and userId
    getResultsByQuizId(quizId, userId) {
        try {
            const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
            return data.results.filter(result => result.quizId === quizId && result.userId === userId);
        } catch (error) {
            console.error("Error reading results:", error);
            return []; // Return an empty array in case of an error
        }
    }
    
};

module.exports = localStorageService;

