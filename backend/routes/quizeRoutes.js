
import express from 'express';
const router = express.Router();



import quizController from '../controllers/quizController.js'


router.post('/create', quizController.createQuiz);


router.get('/:uniqueUrl', quizController.getQuizByUniqueUrl);

router.delete('/delete/:uniqueUrl', quizController.deleteQuizByUniqueUrl);


router.get('/', quizController.getAllQuiz);

export default router;
