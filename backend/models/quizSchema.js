import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Q&A', 'Poll'],
        required: true
    },
    questionType: {
        type: String,
        enum: ['Text', 'Image', 'Text and Image'],
        required: true
    },
    text: {
        type: String,
        required: function() { return this.questionType !== 'Image'; }
    },
    image: {
        type: String, // URL or base64
        required: function() { return this.questionType !== 'Text'; }
    },
    timer: {
        type: Number,
        enum: [0, 5, 10],
        default: 0
    }
}, { _id: false }); // Nested document, hence no _id




const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Q&A', 'Poll'],
        required: true
    },
    questions: {
        type: [questionSchema],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    uniqueUrl: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 5;
}

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
