const Joi = require('joi');

//validation for create quiz
const createQuizSchema = Joi.object({
    title: Joi.string().min(3).required(),
    questions: Joi.array()
        .items(Joi.object({
            text: Joi.string().min(3).required(),
            options: Joi.array()
                .items(Joi.string().required())
                .min(4) // At least 2 options required
                .required(),
            correctOption: Joi.string().required() // The correct answer should be one of the options
        }))
        .min(1) // At least one question required
        .required(),
});

//validation for submit answer
const answerSchema = Joi.object({
    quizId: Joi.string().required(),
    questionId: Joi.string().required(),
    selectedOption: Joi.string().required(),
    userId: Joi.string().required(),
});

module.exports = { createQuizSchema, answerSchema };
