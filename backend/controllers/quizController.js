import Quiz from '../models/quizSchema.js';
import { nanoid } from 'nanoid';

const createQuiz = async (req, res) => {
    try {
        const { title, type, questions } = req.body;

        console.log(req.body)
         
        const uniqueUrl = nanoid(10);
 
        const quiz = new Quiz({
            title,
            type,
            questions,
            uniqueUrl
        });

        await quiz.save();
        return res.status(201).json({ message: 'Quiz created successfully', uniqueUrl });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error creating quiz: ' + error.message });
    }
};

const getQuizByUniqueUrl = async (req, res) => {
    try {
        const { uniqueUrl } = req.params;
        const quiz = await Quiz.findOne({ uniqueUrl });

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Increment quiz impression count
        quiz.quizImpressionCount += 1;

        // Increment question impression counts
        quiz.questions.forEach(question => {
            question.impressionCount += 1;
        });

        await quiz.save();

        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving quiz: ' + error.message });
    }
};
const deleteQuizByUniqueUrl = async (req, res) => {
    try {
        const { uniqueUrl } = req.params;
        console.log(uniqueUrl)
        const quiz = await Quiz.findOne({ uniqueUrl });

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        const qd=await Quiz.deleteOne({uniqueUrl})

        return res.status(200).json("quiz deleted");
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving quiz: ' + error.message });
    }
};
const getAllQuiz = async (req, res) => {
    try {
        
        const quiz = await Quiz.find();

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving quiz: ' + error.message });
    }
};


export default {createQuiz, getQuizByUniqueUrl, getAllQuiz, deleteQuizByUniqueUrl}


