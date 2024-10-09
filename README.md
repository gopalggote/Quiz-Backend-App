# Quiz Application

## Overview

This is a Quiz Application built with Node.js and Express. It allows users to create quizzes, answer questions, and track their progress. 
The application supports multiple-choice questions and provides feedback on user answers. 

## Features

- **Create Quizzes:** Users can create quizzes by providing a title and a set of questions.
- **Answer Questions:** Users can answer quiz questions and receive immediate feedback.
- **Restrict Multiple Submission:** User can only submit the answer for question only at signle time.
- **Fetch Historical Scores:** Users can retrieve their previous quiz results and scores.

## Technologies Used

- **Backend:** Node.js, Express
- **Data Storage:** Local storage (JSON file)
- **API Documentation:** Swagger

## Getting Started

### Prerequisites

- Node.js (v18.18.2)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gopalggote/Quiz-Backend-App.git

### Run the application
1. Navigate to the project directory
   cd Quiz-Backend-App
2. Install depedencies 
   npm install
3. Run the project
   node server.js
4. Check application running status on browser
   http://localhost:3000
5. Check the swagger ui on browser
    http://localhost:3000/api-docs/
