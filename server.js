const express = require('express');
const bodyParser = require('body-parser');

// routes path 
const quizRoutes = require('./route/quiz.route');
const answerRoutes = require('./route/answer.routes');
const resultRoutes = require('./route/result.route');

const swaggerDocs = require('./swagger');

const app = express();
app.use(bodyParser.json());

app.use('/api/quiz', quizRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/result', resultRoutes);

// Initialize Swagger
swaggerDocs(app);

// Default route to show "Service is running on browser"
app.get('/', (req, res) => {
    res.send('Quiz App Server is running...');
  });

const PORT = process.env.PORT || 3000; // application running port

app.listen(PORT, () => {
    console.log(`Quiz App Server is running on port ${PORT}`);
});
