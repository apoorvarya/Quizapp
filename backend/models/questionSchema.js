const mongoose = require('mongoose');

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
