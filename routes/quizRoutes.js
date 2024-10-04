const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Rotas para provas
router.get('/:cursoId/provas', quizController.listQuizzesByCourse);
router.post('/:cursoId/provas', quizController.createQuiz);
router.post('/:cursoId/simulados', quizController.createQuizFromCategories);

module.exports = router;
