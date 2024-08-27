
import express from 'express';
const router = express.Router();



import quizController from '../controllers/quizController.js'


router.post('/create', quizController.createQuiz);


router.get('/:uniqueUrl', quizController.getQuizByUniqueUrl);

export default router;
