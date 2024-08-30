import mongoose from 'mongoose';

// Option Schema
const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        // // required: true
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, { _id: false }); // Nested document, hence no _id

// Question Schema
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        // required: true
    },
    type: {
        type: String,
        enum: ['Text', 'Image', 'Text and Image'],
        // required: true
    },
    options: {
        type: [optionSchema],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4']
    },
    correctOption: {
        type: Number,
        // required: true,
        min: 0,
        max: 3
    },
    timer: {
        type: Number,
        enum: [0, 5, 10],
        default: 0
    },
    impressionCount: {
        type: Number,
        default: 0
    }
}, { _id: false }); // Nested document, hence no _id

function arrayLimit(val) {
    return val.length <= 4; // Max 4 options per question
}

// Quiz Schema
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    type: {
        type: String,
        enum: ['Q&A', 'Poll'],
        // required: true
    },
    questions: {
        type: [questionSchema],
        validate: [arrayLimitQuiz, '{PATH} exceeds the limit of 5']
    },
    uniqueUrl: {
        type: String,
        // required: true,
        unique: true
    },
    quizImpressionCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

function arrayLimitQuiz(val) {
    return val.length <= 5; // Max 5 questions per quiz
}

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
